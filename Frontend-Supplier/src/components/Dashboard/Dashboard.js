import React, { Component } from 'react';
import Helmet from "react-helmet";
import BarGraph from './BarGraph';
import ProductAmountProfit from './ProductAmountProfit';
import { Container } from '@material-ui/core';
import axios from 'axios';
import TotalIncome from './TotalIncome';

export default class Dashboard extends Component {
    render() {
        return (
            <Container style={{ 'minWidth': '1000px' }}>
                <Helmet>
                    <meta charset="utf-12" />
                    <title>DashBoard - Supplier</title>
                </Helmet>
                <TotalIncome/>
                <h3>Monthly Orders in Current Year</h3>
                <BarGraph title={''} />
                <ProductAmountProfit />
            </Container>
        )
    }

    componentWillMount = () => {
        axios.get(`http://localhost:8000/sinfApi/login`);
    }
}
