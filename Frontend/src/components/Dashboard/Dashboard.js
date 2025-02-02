import React, { Component } from 'react';
import Helmet from "react-helmet";
import BarGraph from './BarGraph';
import ProductAmountProfit from './ProductAmountProfit';
import { Container } from '@material-ui/core';
import axios from 'axios';

export default class Dashboard extends Component {
    render() {
        return (
            <Container style={{ 'minWidth': '1000px' }}>
                <Helmet>
                    <meta charset="utf-12" />
                    <title>DashBoard - Client</title>
                </Helmet>
                <h3>Monthly Expenses in Current Year</h3>
                <BarGraph title={'Monthly Expenses in Current Year'} />
                <ProductAmountProfit />
            </Container>
        )
    }

    componentWillMount = () => {
        axios.get(`http://localhost:8000/sinfApi/login`);
    }
}
