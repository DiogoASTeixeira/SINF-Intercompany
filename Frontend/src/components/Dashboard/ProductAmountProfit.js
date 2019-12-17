import React, { Component } from 'react'
import ProductAmountProfitTable from './ProductAmountProfitTable';
import axios from 'axios';

export default class ProductAmountProfit extends Component {
    constructor() {
        super();
        this.state = {
            headings: ['Name', 'Units', 'Spendings (€)'],
            rows: []
        }
    }

    render() {
        const { headings, rows } = this.state;

        return (
            <ProductAmountProfitTable
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
                        profit: (Math.round(res.data[k].profit * 100) / 100).toFixed(2)
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
