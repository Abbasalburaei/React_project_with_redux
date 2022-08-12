import { Ruller, SectionHeading } from "../../components/layouts/Common";
import { Col, Row } from "reactstrap";
import { TextInput } from "../../components/inputs/TextInput";
import { Dropdown } from "../../components/inputs/Dropdown";
import { FormButton } from "../../components/inputs/FormButton";
import { ContentLoader } from "../../components/ContentLoader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateAmount, handleFilterAreas, initData, resetTransform, sendData } from "./sendTransformSlice";
import { useState } from "react";
import Joi from "joi";
import { useReactToPrint } from 'react-to-print';
import { formValidate, GetMessages } from "../../utils/validation";
import { useRef} from "react";
import { SendTransformReport } from "../../components/reports/Report";

const SendTransform = () => {

    const dispatch = useDispatch();
    const {loading 
        , customers 
        , companies
        , cities 
        ,transformDraft
        ,success
        ,btnLoading
        , filterAreas 
        , finalTotal} = useSelector(state=> state.sendTransform);
    
    const [requestData,setRequestData] = useState({
        selectedCity:'',
        selectedArea:'',
        selectedCompany:'',
        transformAmount:'',
        note:null,
        fees:'',
        senderData:{
            id:'',
            fullName:null,
            phoneNumber:'',
        },
        receiverData:{
            id:'',
            fullName:null,
            phoneNumber:'',
        },
    });

    let schema = Joi.object().keys({
        selectedCity: Joi.string().messages(GetMessages()).required(),
        selectedArea: Joi.string().messages(GetMessages()).required(),
        selectedCompany: Joi.string().messages(GetMessages()).required(),
        transformAmount:Joi.string().required().messages(GetMessages()),
        fees:Joi.string().required().messages(GetMessages())
       });

    const [error,setError] = useState({});
    //-----------------------------------------------------------------------------   

    let senderSchema = Joi.object().keys({
          id: Joi.string().messages(GetMessages()).required(),
          phoneNumber : Joi.string().length(9).pattern(/^[0-9]+$/).messages(GetMessages()).required(),
    });
    const [senderError,setSenderError] = useState({});
    //------------------------------------------------------------------------------

    let receiverSchema = Joi.object().keys({
        id: Joi.string().messages(GetMessages()).required(),
        phoneNumber : Joi.string().length(9).pattern(/^[0-9]+$/).messages(GetMessages()).required(),
     });

     const [receiverError,setReceiverError] = useState({});

    useEffect(()=>{
     dispatch(initData({name:'transform/index'}));
    },[dispatch]);
 
    //------------------------------------------------------------------------------
    
     const handleSendRequest = ()=>{
        const result = formValidate(schema, requestData) ?? {};
        setError(result);
        const senderResult = formValidate(senderSchema, {...requestData.senderData}) ?? {};
        setSenderError(senderResult);
        const receiverResult = formValidate(receiverSchema, {...requestData.receiverData}) ?? {};
        setReceiverError(receiverResult);
        if((Object.keys(result).length === 0) && Object.keys(senderResult).length === 0 && Object.keys(receiverResult).length === 0){
          dispatch(sendData({name:'transform/send',data:requestData}));
        }
     };

     const componentRef = useRef();
     
     const handlePrint = useReactToPrint({
       content: () => componentRef.current,
       documentTitle:'سند ارسال حوالة'
     });

     useEffect(()=>{
        if(success && (transformDraft !== null)){
         dispatch(resetTransform());
         handlePrint();
         setReceiverError({});
         setSenderError({});
         setError({});
         setRequestData({
            selectedCity:'',
            selectedArea:'',
            selectedCompany:'',
            transformAmount:'',
            note:null,
            fees:'',
            senderData:{
                id:'',
                fullName:null,
                phoneNumber:'',
            },
            receiverData:{
                id:'',
                fullName:null,
                phoneNumber:'',
            },
        });
        }
     },[dispatch,success,handlePrint,transformDraft]);


    return <ContentLoader isLoading={loading} element={<div className="clayout-container">
    <div className="container-fluid flex flex-col core-gap-1">
        <SectionHeading
            title='ارسال حوالة'
            subTitlePre="ملاحظة"
            subTitle="يجب الانتباة جيداً اثناء ادخال بيانات الحوالة."
            decorationClassNames='core-border-secondary'
        />
        <Ruller />
        <Row>
            <Col lg={3} md={4} sm={6}>
                <Dropdown
                    label="المدينة"
                    cache={true}
                    error={error?.selectedCity}
                    options={[...cities]}
                    onChange={(value)=>{
                      setRequestData({...requestData , selectedCity : String(value?.value)});  
                      dispatch(handleFilterAreas(value?.value));
                    }}
                />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <Dropdown
                    label="المنطقة"
                    options={[...filterAreas]}
                    error={error?.selectedArea}
                    cache={true}
                    onChange={(value)=>{
                        setRequestData({...requestData , selectedArea : String(value?.value)});  
                    }}
                />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <Dropdown
                    label="نقطة التحويل"
                    cache={true}
                    options={[...companies]}
                    error={error?.selectedCompany}
                    onChange={(value)=>{
                        setRequestData({...requestData , selectedCompany : String(value?.value) });  
                    }}
                />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <TextInput
                    initialValue={requestData?.transformAmount}
                    type="number"
                    title="مبلغ الحوالة"
                    error={error?.transformAmount}
                    onChangeValue={(value)=>{
                        setRequestData({...requestData , transformAmount : String(value)});  
                        dispatch(calculateAmount({fees : requestData?.fees , amount : value}))
                    }}
                />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <TextInput
                    initialValue={requestData?.fees}
                    type="number"
                    title="رسوم الحوالة"
                    error={error?.fees}
                    onChangeValue={(value)=>{
                        setRequestData({...requestData , fees : String(value)});  
                        dispatch(calculateAmount({fees : value , amount : requestData?.transformAmount}))
                    }}
                />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <TextInput
                    initialValue={String(finalTotal)}
                    type="text"
                    className='text-center'
                    disabled={true}
                    title="الاجمالي الكلي"
                />
            </Col>
            <Col>
                <TextInput
                    initialValue={requestData?.note}
                    length={1000}
                    type="text"
                    title="ملاحظة"
                    onChangeValue={(value)=>{
                        setRequestData({...requestData , note: value});
                    }}
                />
            </Col>
        </Row>

        <Row>
            <Col md={6}>
                <SectionHeading
                    title='بيانات المستلم'
                    decorationClassNames='core-border-secondary'
                />
                <Ruller />
                <Row>
                    <Col>
                        <Dropdown
                            label="الاسم الرباعي"
                            cache={true}
                            error={receiverError?.id}
                            options={[...customers]}
                            onChange={(value)=>{
                                const currentReceiverData = {...requestData?.receiverData};
                                currentReceiverData.id = value?.value;
                                setRequestData({...requestData , receiverData : currentReceiverData});
                            }}

                        />

                        <div className="my-2">
                            <TextInput
                                error={receiverError?.phoneNumber}
                                type="text"
                                title="رقم الهاتف"
                                initialValue={requestData?.receiverData?.phoneNumber}
                                onChangeValue={(value)=>{
                                    const currentReceiverData = {...requestData?.receiverData};
                                    currentReceiverData.phoneNumber = value;
                                    setRequestData({...requestData , receiverData : currentReceiverData});
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>

            <Col md={6}>
                <SectionHeading
                    title='بيانات المرسل'
                    decorationClassNames='core-border-secondary'
                />
                <Ruller />
                <Row>
                    <Col>
                        <Dropdown
                            label="الاسم الرباعي"
                            cache={true}
                            error={senderError?.id}
                            options={[...customers]}
                            onChange={(value)=>{
                                const currentSenderData = {...requestData?.senderData};
                                currentSenderData.id = value?.value;
                                setRequestData({...requestData , senderData : currentSenderData});
                            }}
                        />
                        <div className="my-2">
                            <TextInput
                                initialValue={requestData?.senderData?.phoneNumber}
                                type="text"
                                error={senderError?.phoneNumber}
                                title="رقم الهاتف"
                                onChangeValue={(value)=>{
                                    const currentSenderData = {...requestData?.senderData};
                                    currentSenderData.phoneNumber = value;
                                    setRequestData({...requestData , senderData : currentSenderData});
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Col>
           <div>
           <FormButton title="ارسال" onClick={handleSendRequest} isLoading={btnLoading}/>
           </div>
        </Row>
    </div>
    <SendTransformReport
    headTitle ='شركة يمن اكسبرس للصرافة'
    subTitle="سند ارسال حوالة"
    ref={componentRef} 
    {...transformDraft}
    currency="ريال يمني"
    />
</div>}/>
};

export default SendTransform;