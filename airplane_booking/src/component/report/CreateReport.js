import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useState} from "react";
import "../../css/report/style.css"
import {searchAbout1API, searchAboutAPI, searchCurrentAPI, searchPreviousAPI} from "../../services/ReportService";
import {ChartComponent} from "./ChartComponent";
import {Chart} from "chart.js/auto"
import ExportExcel from "./ExprortExcel";
import * as yup from "yup";


export default function CreateReport() {
    const [dataTimeCurrent, setDataTimeCurrent] = useState();
    const [dataTimePrevious, setDataTimePrevious] = useState();
    const [dataTimeAbout, setDataTimeAbout] = useState();
    const [dataTimeAbout1, setDataTimeAbout1] = useState();


    const resetFieldName = (resetForm) => {
        resetForm(); // Reset the form
        setDataTimeCurrent(null); // Reset data for ChartComponent
        setDataTimePrevious(null);
        setDataTimeAbout(null);
        setDataTimeAbout1(null);
    };

    const getDataCurrent = async (timeCurrent) => {
        const res = await searchCurrentAPI(timeCurrent)

        if (res === null) {
            setDataTimeCurrent([{
                dateBooking: null,
                priceTicket: null,
            }]);
        } else {
            setDataTimeCurrent(res.data);
        }
    }
    const getDataPrevious = async (timePrevious) => {
        const res = await searchPreviousAPI(timePrevious)
        if (res === null) {
            setDataTimePrevious([{
                dateBooking: null,
                priceTicket: null
            }]);
        } else {
            setDataTimePrevious(res.data);
        }
    }
    const getDataAbout = async (starDate, endDate) => {
        const res = await searchAboutAPI(starDate, endDate)
        if (res === null) {
            setDataTimeAbout([{
                dateBooking: null,
                priceTicket: null
            }]);
        } else {
            setDataTimeAbout(res.data);
        }
    }
    const getDataAbout1 = async (starDate1, endDate1) => {
        const res = await searchAbout1API(starDate1, endDate1)
        if (res === null) {
            setDataTimeAbout1([{
                dateBooking: null,
                priceTicket: null
            }]);
        } else {
            setDataTimeAbout1(res.data);
        }
    }
    const handleOnclickExport = async () => {
        const res = await dataTimeCurrent;
        if (res) {
            await ExportExcel.exportExcel(res.data, "Danh sách doanh thu", "ListRevenue")
        }
    }

    return (
        <>
            <div className="row" style={{backgroundColor: "white"}}>
                <div className="col-6">
                    <div style={{marginTop: "-5vh", marginRight: "3vw"}} className="section">
                        <div className="section-center">
                            <div className="container">
                                <div className="booking-form">
                                    <div className="" style={{padding: "0px"}}>
                                        <p>Thống kê báo cáo</p>
                                    </div>
                                    <Formik initialValues={{
                                        travelType: "one-way",
                                        timeCurrent: "",
                                        timePrevious: "",
                                        startDate: "",
                                        endDate: "",
                                        startDate1: "",
                                        endDate1: "",
                                    }}

                                            onSubmit={async (values) => {
                                                const fetchData = async () => {

                                                    if (values.travelType === "one-way") {
                                                        await getDataCurrent(values.timeCurrent);
                                                        await getDataPrevious(values.timeCurrent);

                                                    } else if (values.travelType === "multi-city") {
                                                        await getDataAbout(values.startDate, values.endDate);
                                                        await getDataAbout1(values.startDate1, values.endDate1);
                                                    }
                                                };
                                                fetchData();
                                            }}>
                                        {({values, resetForm}) => (
                                            <Form className="booking-form-padding">
                                                <div>
                                                    <div>
                                                        <label htmlFor="one-way" style={{width: "100%"}}>
                                                            <Field type="radio" id="one-way" name="travelType"
                                                                   value="one-way"
                                                                   onClick={() => resetFieldName(resetForm)}/>
                                                        </label>
                                                        <div className="form-group">
                                                    <span className="form-label">So sánh nhanh <span
                                                        style={{color: "red"}}>*</span></span>
                                                            <Field as="select" className="form-control"
                                                                   name="timeCurrent"
                                                                   disabled={values.travelType === "multi-city" }
                                                                   required={values.travelType === 'one-way'}
                                                            >
                                                                <option value="">--Vui lòng chọn thời gian--</option>
                                                                <option value="week">Tuần này - Tuần Trước</option>
                                                                <option value="month">Tháng này - Tháng trước</option>
                                                                <option value="quarter">Quý này - Quý trước</option>
                                                                <option value="year">Năm này - Năm trước</option>
                                                            </Field>
                                                            <Field className="form-control" name="timePrevious" hidden/>
                                                            <ErrorMessage name="timeCurrent" component="span"
                                                                          style={{color: "red"}}/>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="multi-city">
                                                            <Field type="radio" id="multi-city" name="travelType"
                                                                   value="multi-city"
                                                                   onClick={() => resetFieldName(resetForm)}/>
                                                        </label>
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                        <span className="form-label">Từ <span
                                                            style={{color: "red"}}>*</span></span>
                                                                    <Field className="form-control" type="date"
                                                                           name="startDate"
                                                                           disabled={values.travelType === "one-way"}
                                                                           required={values.travelType === 'multi-city'}/>
                                                                    <ErrorMessage name="timeCurrent" component="span"
                                                                                  style={{color: "red"}}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="form-group">
                                                        <span className="form-label">Đến <span
                                                            style={{color: "red"}}>*</span></span>
                                                                    <Field className="form-control" type="date"
                                                                           name="endDate"
                                                                           disabled={values.travelType === "one-way"}
                                                                           required={values.travelType === 'multi-city'}/>
                                                                    <ErrorMessage name="timeCurrent" component="span"
                                                                                  style={{color: "red"}}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h4><b>So sánh với:</b></h4>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">


                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Từ </span>
                                                            <Field className="form-control" type="date" name="starDate1"
                                                                   disabled={values.travelType === "one-way"}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <span className="form-label">Đến</span>
                                                            <Field className="form-control" type="date" name="endDate1"
                                                                   disabled={values.travelType === "one-way"}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{textAlign: "center"}}>
                                                    <button className="btn" style={{background: "#daa32a"}}>Xem</button>
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                        <div style={{width: "70vw", height: "70vh"}}>
                            {dataTimeCurrent && dataTimePrevious || dataTimeAbout && dataTimeAbout1 ?
                                <ChartComponent dataTimeCurrent={dataTimeCurrent}
                                                dataTimePrevious={dataTimePrevious}
                                                dataTimeAbout={dataTimeAbout}
                                                dataTimeAbout1={dataTimeAbout1}
                                /> :
                                <ChartComponent dataTimeCurrent={[]}
                                                dataTimePrevious={[]}
                                                dataTimeAbout={[]}
                                                dataTimeAbout1={[]}/>
                            }
                            <div style={{textAlign: "center"}}>
                                <button className="btn" style={{background: "#daa32a"}}
                                        onClick={() => handleOnclickExport()}>In báo cáo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}