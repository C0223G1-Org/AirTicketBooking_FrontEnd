import React from 'react';
import {Line} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';

export const ChartComponent = ({dataTimeCurrent, dataTimePrevious, dataTimeAbout, dataTimeAbout1}) => {
    let chartData, options;

    if (dataTimeCurrent && dataTimeCurrent.length > 0 && dataTimePrevious && dataTimePrevious.length > 0) {
        chartData = {
            labels: [],
            datasets: [
                {
                    label: dataTimeCurrent[0].title,
                    data: dataTimeCurrent.map((row) => row.priceTicket),
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                },
                {
                    label: dataTimePrevious[0].title,
                    data: dataTimePrevious.map((row) => row.priceTicket),
                    borderColor: '#36A2EB',
                    backgroundColor: '#36A2EB',
                    fill: false,
                },
            ],
        };

        options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category', // Use 'category' scale for the x-axis
                    labels: dataTimePrevious.map((row) => row.dateBooking),
                    title: {
                        display: true,
                        text: 'Thời gian',
                        font: {
                            size: 20,
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Doanh thu',
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return parseFloat(value).toLocaleString('vi-VN')+' VNĐ';
                        }
                    }
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Thống kê doanh thu',
                    font: {
                        size: 50,
                    },
                },
                legend: {
                    labels: {
                        font: {
                            size: 20,
                        },
                    },
                },
            },
        };
        return <Line data={chartData} options={options}/>;
    } else if (dataTimeAbout && dataTimeAbout1) {
        chartData = {
            labels: [],
            datasets: [
                {
                    label: dataTimeAbout.map((row) => row.dateBooking),
                    data: dataTimeAbout.map((row) => row.priceTicket),
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                    maxBarThickness: 50,
                },
                {
                    label:dataTimeAbout1.map((row) => row.dateBooking),
                    data: dataTimeAbout1.map((row) => row.priceTicket),
                    borderColor: '#36A2EB',
                    backgroundColor: '#36A2EB',
                    fill: false,
                    maxBarThickness: 50,
                },
            ],
        };

        options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category', // Use 'category' scale for the x-axis
                    labels: ["So sánh"],
                    title: {
                        display: true,
                        font: {
                            size: 20,
                        },
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Doanh thu',
                        font: {
                            size: 20,
                        },
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return parseFloat(value).toLocaleString('vi-VN')+' VNĐ';
                        }
                    }
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Thống kê doanh thu',
                    font: {
                        size: 50,
                    },
                },
                legend: {
                    labels: {
                        font: {
                            size: 20,
                        },
                    },
                },
            },
        };
        return <Bar data={chartData} options={options}/>;
    }


};