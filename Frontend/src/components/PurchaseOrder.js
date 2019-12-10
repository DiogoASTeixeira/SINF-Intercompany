import React, { Component, Fragment } from 'react';
import Helmet from "react-helmet";
import PurchaseOrderForm from './PurchaseOrderForm';
import PurchaseOrderTable from './PurchaseOrderTable';

export default class PurchaseOrder extends Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <meta charset="utf-8" />
                    <title>Purchase Order</title>
                </Helmet>

                <PurchaseOrderForm handleSubmit={this.props.handleSubmit} />

                <PurchaseOrderTable />
            </Fragment>
        )
    }
}
