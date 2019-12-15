import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

export default class BarGraph extends Component {

    constructor(props) {
        super(props);

        const { title } = this.props;

        this.state = {
            options: {
                dataLabels: {
                    enabled: false
                },

                stroke: {
                    width: [1, 1, 4]
                },
                title: {
                    text: title,
                    align: 'left',
                    offsetX: 110
                },
                xaxis: {
                    categories: [],
                },
                yaxis: [
                    {
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#008FFB'
                        },
                        labels: {
                            style: {
                                color: '#008FFB',
                            }
                        },
                        title: {
                            text: "Units",
                            style: {
                                color: '#008FFB',
                            }
                        },
                        tooltip: {
                            enabled: true
                        }
                    },

                    {
                        seriesName: 'Income',
                        opposite: true,
                        axisTicks: {
                            show: true,
                        },
                        axisBorder: {
                            show: true,
                            color: '#00E396'
                        },
                        labels: {
                            style: {
                                color: '#00E396',
                            }
                        },
                        title: {
                            text: "Profit",
                            style: {
                                color: '#00E396',
                            }
                        },
                    },
                    // {
                    //     seriesName: 'Revenue',
                    //     opposite: true,
                    //     axisTicks: {
                    //         show: true,
                    //     },
                    //     axisBorder: {
                    //         show: true,
                    //         color: '#FEB019'
                    //     },
                    //     labels: {
                    //         style: {
                    //             color: '#FEB019',
                    //         },
                    //     },
                    //     title: {
                    //         text: "Revenue (thousand crores)",
                    //         style: {
                    //             color: '#FEB019',
                    //         }
                    //     }
                    // },
                ],
                tooltip: {
                    fixed: {
                        enabled: true,
                        position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                        offsetY: 30,
                        offsetX: 60
                    },
                },
                legend: {
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            },
            series: [{
                name: 'Units Sold',
                type: 'column',
                data: []
            }, {
                name: 'Profit',
                type: 'column',
                data: []
            },
            // {
            //     name: 'Revenue',
            //     type: 'line',
            //     data: []
            // }
        ],
        }
    }

    render() {

        return (
            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height="350" />
            </div>
        );
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8000/sinfApi/login`)
            .then(
                axios.get(`http://localhost:8000/sinfApi/stats/month-amount-profit`)
                    .then(res => {
                        console.log(res.data);
                        let months = [];
                        let unitsData = [];
                        let profitData = [];
                        for (let k in res.data) {
                            months.push(k);
                            unitsData.push(res.data[k].units);
                            profitData.push(res.data[k].profit);
                        }
                        this.setState({
                            options: {
                                xaxis: {
                                    categories: months
                                }
                            },
                            series: [{
                                name: 'Units Sold',
                                type: 'column',
                                data: unitsData
                            }, {
                                name: 'Profit',
                                type: 'column',
                                data: profitData
                            }, 
                            // {
                            //     name: 'Revenue',
                            //     type: 'line',
                            //     data: profitData
                            // }
                        ]
                        });
                    }
                    )
            )
    }
}
