import React, { Component, Fragment } from 'react';
import Helmet from "react-helmet";
import SalesOrderForm from './SalesOrderForm';
import SalesOrderTable from './SalesOrderTable';

export default class SalesOrder extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <meta charset="utf-8" />
                    <title>Sales Order</title>
                </Helmet>
                <SalesOrderForm handleSubmit={this.props.handleSubmit} />
                <SalesOrderTable />
            </Fragment>
        )
    }
}
