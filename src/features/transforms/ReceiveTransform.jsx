import {Ruller, SectionHeading } from "../../components/layouts/Common";
import { FormButton } from "../../components/inputs/FormButton";
import { SwitchCheckBox } from "../../components/inputs/SwitchCheckBox";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState } from "react";
import { useMemo } from "react";
import { CellStatus, GroupCellButtons } from "../../components/inputs/CellButton";
import Popup from "../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSummary, initData, updateTransformData } from "./receiveTransformSlice";
import { checkFileExtension } from "../../utils/validation";
import { toast } from "react-toastify";
import { ReceiveTransformReport } from "../../components/reports/Report";
import { useReactToPrint } from "react-to-print";
const ReceiveTransform = () => {
    const dispatch = useDispatch();
    const {loading , data , transformReport} = useSelector(state=>state.receiveTransform);
    const [showPopup,setShowPopup] = useState(false);
    const [fileName,setFileName] = useState(null);
    const [fileData,setFileData] = useState(null);
    const fileRef = useRef();
    const [tempTransformNo,setTempTransformNo] = useState(null);
    const [selectedOption,setSelectedOption] = useState(false);

    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true,
            sortable: true,
            resizable: true,
            filter: true,
            flex: 1,
            minWidth: 100,
        };
    }, []);

    const [columnDefs] = useState([
        { field: 'transformNo' , headerName:'رقم الحوالة'},
        { field: 'senderName' ,headerName:'اسم المرسل'},
        { field: 'senderPhoneNumber' ,headerName:'رقم المرسل' },
        { field: 'receiverName',headerName:'اسم المستلم' },
        { field: 'receiverPhoneNumber' ,headerName:'رقم المستلم' },
        { field: 'sentDate' ,headerName:'تاريخ الارسال'},
        { field: 'receivedDate' ,headerName:'تاريخ الاستلام'},
        { field: 'status' ,headerName:'الحالة' , cellRendererSelector : p =>{
          return {component :CellStatus , params:{done:p.value}}
        }},
        {field: 'edit',headerName:'معالجة' , cellRenderer: GroupCellButtons,
        cellRendererParams: {
            editHint:'معالجة',
            printHint:'طباعة',
            onEdit : (field)=>{
                setTempTransformNo(field?.value);
                setShowPopup(true);
            },
            onPrint : (field)=>{
              dispatch(getSummary({name:'transform/summary',data:{transformNo:field?.value}}));
              handlePrint();
            },
            editClassName:'btn-primary',
            editIconPath:'/assets/icons/edit.svg',
            printClassName:'btn-primary',
            printIconPath:'/assets/icons/print.svg'
          }
        }
    ]);

    useEffect(()=>{
     dispatch(initData({name:'transform/all'}));
    },[transformReport,dispatch]);

    const handleUploadIdentityCard =  ({target})=>{
            try {
                const files = target.files;
                if (files?.length > 0) {
                    const file = files[0];
                    if (checkFileExtension(['png', 'jpeg','jpg'], file.name)) {
                        setFileData(file);
                        setFileName(file.name.split('.')[0]);
                    } else {
                        toast.error("صيغة الملف خاطئة !!!");
                        setFileData(null);
                        setFileName(null);
                    }

                }else{
                    setFileData(null);
                    setFileName(null);
                }
            } catch (error) {
                console.log(error);
            }
    };

    const handleReset = ()=>{
      fileRef.current.value = '';
      setShowPopup(false);
      setFileData(null);
      setFileName(null);
      setTempTransformNo(null);
      setSelectedOption(false);
    };

    const handleSubmitData = ()=>{
     if(tempTransformNo){
        const formData = new FormData();
        formData.append("selectedOption",selectedOption);
        formData.append("imageFile",fileData);
        formData.append("transformNo",tempTransformNo);
        dispatch(updateTransformData({name :'transform/updateTransform',
        data:formData}));
        handlePrint();
        handleReset();
     }
    };

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
      documentTitle:'سند استلام حوالة'
    });

    return <div className="clayout-container">
        <div className="container-fluid flex flex-col core-gap-1">
            <SectionHeading
                title='استلام حوالة'
                decorationClassNames='core-border-secondary'
            />
            <Ruller />
            <div className="ag-theme-alpine w-full" style={{ height: 400 }}>
                <AgGridReact
                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                    pagination={true}
                    defaultColDef={defaultColDef}
                    enableRtl={true}
                    rowData={[...data]}
                    columnDefs={columnDefs}>
                </AgGridReact>
            </div>

        </div>
      <Popup show={showPopup}>
      <div className='w-full h-full flex flex-col items-center'>
            <div className='popup-container'>
                <div className='popup-container-header'>
                    <div className='popup-container-header-frame'>
                        <img src={`/assets/icons/${'info'}.svg`} alt={'تاكيد'} />
                    </div>
                    <h2 className='font-bold ctext-font-3'>{'تاكيد'}</h2>
                </div>
                <div className='popup-container-body p-2'>
                    <div className='flex flex-col core-gap-1' onClick={()=>{
                        fileRef.current.click();
                    }}>
                       <label className="ctext-font-1 font-bold">ارفاق صورة البطاقة الشخصية؟</label>
                       <div className="cbtn-draggable pointer my-2">
                          <p>{fileName ? fileName : 'اضغط هنا لاضافة ملف'}</p>
                       </div>
                       <input accept='.png,.jpeg,.jpg' multiple={false} onChange={handleUploadIdentityCard} type='file' hidden ref={fileRef}/>
                    </div>
                    <SwitchCheckBox
                      title="اضافة البطاقة الشخصية من الملف الشخصي"
                      onChangeValue={(value)=>{
                        setSelectedOption(value);
                      }}
                    />
                    <div className='popup-container-body-actions'>
                        <FormButton
                            title={'حفظ وطباعة'}
                            onClick={handleSubmitData}
                            isLoading={loading}
                        />
                        <FormButton
                            className='btn-light ctext-black'
                            title={'الغاء الامر'}
                            onClick={handleReset}
                        />
                    </div>
                </div>
            </div>
        </div>
      </Popup>
    <ReceiveTransformReport
    headTitle ='شركة يمن اكسبرس للصرافة'
    subTitle="سند استلام حوالة"
    ref={componentRef} 
    {...transformReport}
    currency="ريال يمني"
    />
    </div>
};

export default ReceiveTransform;