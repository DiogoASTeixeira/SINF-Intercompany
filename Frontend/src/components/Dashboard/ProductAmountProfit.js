import React, { Component } from 'react'
import ProductAmountProftTable from './ProductAmountProfitTable';
import axios from 'axios';

export default class ProductAmountProfit extends Component {
    constructor() {
        super();
        this.state = {
            headings: ['Name', 'Units', 'Profit'],
            rows: []
        }
    }

    render() {
        const { headings, rows } = this.state;

        return (
            <ProductAmountProftTable
                headings={headings}
                rows={rows}
            />
        )
    }

    componentDidMount = () => {
        axios.get(`http://localhost:8000/sinfApi/stats/product-amount-profit`)
            .then(res => {
                let rows = [];

                for(let k in res.data)
                {
                    let obj = {
                        name: k,
                        units: res.data[k].units,
                        profit: res.data[k].profit
                    };
                    rows.push(obj);
                }

                this.setState({
                    rows: rows
                })
            }
            );
    }
}
