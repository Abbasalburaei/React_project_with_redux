import { Col, Row } from "reactstrap";
import { FormButton } from "../../components/inputs/FormButton";
import { TextInput } from "../../components/inputs/TextInput";
import { Ruller, SectionHeading } from "../../components/layouts/Common";
import { useMemo, useState, useRef } from "react";
import Joi from "joi";
import { useReactToPrint } from 'react-to-print';
import { formValidate, GetMessages } from "../../utils/validation";
import { TransformDailyReport } from "../../components/reports/Report";
import { useDispatch, useSelector } from "react-redux";
import { summaryReportsData } from "./reportDailySlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const ReportDaily = () => {

    
   
    const {t:trans} = useTranslation("common");
    const {data,loading} = useSelector(state=>state.dailyTransform);
    const dispatch = useDispatch();

    const componentRef = useRef();



    const print = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'تقرير بالحوالات اليومية'
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
            'تاريخ العملية',
            'عدد الحوالات',
            'اجمالي رسوم الحوالات',
            'اجمالي الحوالات المستلمة',
            'اجمالي الحوالات المصروفة'
        ]
    }, []);

    const [requestData, setRequestData] = useState({
        startDate: '',
        endDate: ''
    });

    let schema = Joi.object().keys({
        startDate: Joi.string().messages(GetMessages()).required(),
        endDate: Joi.string().messages(GetMessages()).required()
    });

    const [error, setError] = useState({});

    const handleRequestData = () => {
        const result = formValidate(schema, requestData) ?? {};
        setError(result);
        if (Object.keys(result).length === 0) {
          dispatch(summaryReportsData({name:`transform/daily?startDate=${requestData?.startDate}&endDate=${requestData?.endDate}`}));
        }
    };

    return <div className="clayout-container">
        <div className="container-fluid flex flex-col core-gap-1">
            <SectionHeading
                title='التقارير اليومية'
                subTitlePre='ملاحظة'
                subTitle=''
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
                                    type="date"
                                    title="تاريخ بداية الفترة"
                                    error={error?.startDate}
                                    onChangeValue={(value) => {
                                        setRequestData({ ...requestData, startDate: value });
                                    }}
                                />
                            </Col>
                            <Col lg={3} md={4} sm={6}>
                                <TextInput
                                    type="date"
                                    title="تاريخ نهاية الفترة"
                                    error={error?.endDate}
                                    onChangeValue={(value) => {
                                        setRequestData({ ...requestData, endDate: value });
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
                 <TransformDailyReport
                 ref={componentRef}
                 headTitle='شركة يمن اكسبرس للصرافة'
                 subTitle='تقرير الحوالات اليومية'
                 columnDef={columnDef}
                 rowsData={[...data]}
                 />
            </div>
        </div>
    </div>
};

export default ReportDaily;


