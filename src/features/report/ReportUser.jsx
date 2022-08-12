import { Col, Row } from "reactstrap";
import { FormButton } from "../../components/inputs/FormButton";
import { TextInput } from "../../components/inputs/TextInput";
import { Ruller, SectionHeading } from "../../components/layouts/Common";
import { useMemo, useState, useRef } from "react";
import Joi from "joi";
import { useReactToPrint } from 'react-to-print';
import { formValidate, GetMessages } from "../../utils/validation";
import { TransformSpecialReport } from "../../components/reports/Report";
import { useDispatch, useSelector } from "react-redux";
import { summaryUserReportData } from "./reportUserSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const ReportUser = () => {

    const {t:trans} = useTranslation("common");
    const {data,loading} = useSelector(state=>state.userTransform);
    const dispatch = useDispatch();
    const componentRef = useRef();

    const print = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'تقرير مخصص'
    }); 

    const handlePrint = ()=>{
        if(data?.length > 0){
            print();
        }else{
            toast.info(trans("common:no_data_to_print"));
        }
    };

    const columnDef = useMemo(() => {
        return [
            'رقم الحوالة',
            'تاريخ العملية',
            'نوع العملية',
            'اسم المرسل',
            'رقم المرسل',
            'اسم المستلم',
            'رقم المستلم',
            'المبلغ'
        ]
    }, []);

    const [requestData, setRequestData] = useState({
        search: '',
    });

    let schema = Joi.object().keys({
        search: Joi.string().messages(GetMessages()).required(),
    });

    const [error, setError] = useState({});

    const handleRequestData = () => {
        const result = formValidate(schema, requestData) ?? {};
        setError(result);
        if (Object.keys(result).length === 0) {
          dispatch(summaryUserReportData({name:`transform/special?search=${requestData?.search}`}));
          console.log(data);
        }
    };

    return <div className="clayout-container">
        <div className="container-fluid flex flex-col core-gap-1">
            <SectionHeading
                title='التقارير المخصصة'
                decorationClassNames='core-border-secondary'
            />
            <Ruller />
            <div className='my-2'>
                <div className='flex flex-col mb-5'>
                    <div className='ctext-bg-lighter p-2 flex flex-row core-grap-1 items-center core-border-secondary core-border-rtl'>
                        <img src='/assets/icons/filter.svg' alt='filter' />
                        <h2 className='font-bold'>ادوات الفلترة</h2>
                    </div>
                    <div className='core-shadow-small flex flex-col core-gap-1 p-3'>
                        <Row>
                            <Col lg={3} md={4} sm={6}>
                                <TextInput
                                    length={255}
                                    type="search"
                                    title='نص البحث'
                                    error={error?.search}
                                    onChangeValue={(value) => {
                                        setRequestData({ search: value });
                                    }}
                                />
                            </Col>
                            <div className="flex flex-row  core-gap-1">
                                <FormButton title="بحث" className="ctext-bg-primary ctext-white" onClick={handleRequestData} loading={loading}/>
                                <FormButton title="طباعة" className="ctext-bg-black ctext-white" onClick={handlePrint} />
                            </div>
                        </Row>
                    </div>
                </div>
                 <TransformSpecialReport
                 ref={componentRef}
                 headTitle='شركة يمن اكسبرس للصرافة'
                 subTitle='تقرير مخصص'
                 columnDef={columnDef}
                 rowsData={[...data]}
                 />
            </div>
        </div>
    </div>
};

export default ReportUser;


