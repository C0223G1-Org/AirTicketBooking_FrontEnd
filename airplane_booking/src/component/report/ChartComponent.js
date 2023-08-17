import React from 'react';
import {Line} from 'react-chartjs-2';

export const ChartComponent = ({dataTimeCurrent, dataTimePrevious, dataTimeAbout, dataTimeAbout1}) => {
    let chartData, options;

    if (dataTimeCurrent && dataTimePrevious) {
        chartData = {
            labels: [],
            datasets: [
                {
                    label: "Hiện tại",
                    data: dataTimeCurrent.map((row) => row.priceTicket),
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                },
                {
                    label: "Trước đó",
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
                        text: 'Khoảng thời gian',
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
    } else if (dataTimeAbout && dataTimeAbout1) {
        chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Khoảng thời gian đầu',
                    data: dataTimeAbout.map((row) => row.priceTicket),
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                },
                {
                    label: 'Khoảng thời gian sau',
                    data: dataTimeAbout1.map((row) => row.priceTicket),
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
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                    title: {
                        display: true,
                        text: 'Khoảng thời gian',
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
                },
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Thống kê doanh thu theo tháng',
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
    }

    return <Line data={chartData} options={options}/>;
};