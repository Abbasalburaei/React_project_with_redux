import moment from "moment";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Table } from "reactstrap";
import { ContentLoader } from "../../components/ContentLoader";
import { Ruller, SectionHeading } from "../../components/layouts/Common";
import { StatisticContainer } from "../../components/StatisticContainer";
import { initHomeData } from "./homeSlice";

const Home = () => {


    const dispatch = useDispatch();
    const { loading, sentCount, receivedCount, sentAmountTotal, receivedAmountTotal, data } = useSelector(state => state.home);

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


    useEffect(() => {
        dispatch(initHomeData({ name: 'transform/home' }));
    }, []);


    return <ContentLoader isLoading={loading} element={<div>
        <Row>
            <Col lg={3} md={4} sm={6}>
                <StatisticContainer title="عدد الحوالات المرسلة" value={sentCount} />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <StatisticContainer title="عدد الحوالات المستلمة" value={receivedCount} className="core-border-danger" />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <StatisticContainer title="اجمالي الحوالات المرسلة" value={sentAmountTotal} className="core-border-secondary" />
            </Col>
            <Col lg={3} md={4} sm={6}>
                <StatisticContainer title="اجمالي الحوالات المستلمة" value={receivedAmountTotal} className="core-border-warning" />
            </Col>
        </Row>
        <div className="mt-10">
            <div className="clayout-container">
                <div className="flex flex-col core-gap-1">
                    <SectionHeading
                        title='حوالات اليوم'
                        subTitlePre='ملاحظة'
                        subTitle={'تعتبر الحوالات التالية المنفذة في تاريخ ' + '(' + moment().format('yyyy-MM-D') + ')'}
                        decorationClassNames='core-border-secondary'
                    />
                    <Ruller />
                    <Table bordered dark>
                        <thead>
                            <tr>
                                {
                                    columnDef.map((item, index) => {
                                        return <th key={index} className="ctext-font-2">{item}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) => {
                                    return <tr key={index}>
                                        <td>{item?.transformNo}</td>
                                        <td>{item?.operationDate}</td>
                                        <td>{item?.done ? <span className="ctext-danger ctext-font-1">استلام</span> : <span className="ctext-primary ctext-font-1">ارسال</span>}</td>
                                        <td>{item?.senderName}</td>
                                        <td>{item?.senderPhoneNumber}</td>
                                        <td>{item?.receiverName}</td>
                                        <td>{item?.receiverPhoneNumber}</td>
                                        <td>{item?.amountTotal}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    </div>} />
};

export default Home;