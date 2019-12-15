import React, { Component } from 'react';
import Helmet from "react-helmet";
import BarGraph from './BarGraph';
import { Container } from '@material-ui/core';

export default class Dashboard extends Component {
    render() {
        return (
            <Container style={{ 'minWidth': '1000px' }}>
                <Helmet>
                    <meta charset="utf-12" />
                    <title>DashBoard - Client</title>
                </Helmet>
                <BarGraph
                    title={'Monthly Profit in Current Year'}
                />
            </Container>
        )
    }


}
