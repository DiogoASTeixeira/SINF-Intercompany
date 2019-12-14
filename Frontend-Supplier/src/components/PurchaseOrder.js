import React, { Component, Fragment } from 'react';
import Helmet from "react-helmet";
import PendingRequests from './Table/PendingRequests';
import PopupWindow from './Popup/PopupWindow';
import InvoiceRequests from './Table/InvoiceRequests';
import axios from 'axios';

export default class PurchaseOrder extends Component {
    constructor() {
        super();

        this.state = {
            pendingHeadings: ['Name', 'Date', 'Actions'],
            pendings: [],
            acceptedHeadings: ['Product', 'Status', 'Action'],
            accepted: [],
            showDialog: false,
            dialogContent: []
        };

        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.handleInvoice = this.handleInvoice.bind(this);
        this.foo = this.foo.bind(this);

    }
    render() {
        const { pendingHeadings, pendings, acceptedHeadings, accepted } = this.state;

        return (
            <Fragment>
                <Helmet>
                    <meta charset="utf-8" />
                    <title>Purchase Order</title>
                </Helmet>

                <PendingRequests
                    headings={pendingHeadings}
                    rows={pendings}
                    handleAccept={this.handleAccept}
                    handleReject={this.handleReject}
                />

                <InvoiceRequests
                    headings={acceptedHeadings}
                    rows={accepted}
                    handleInvoice={this.handleInvoice}
                />

                {this.state.showDialog && (
                    <PopupWindow
                        content={this.state.dialogContent}
                        open={this.state.showDialog}
                        onClickClose={this.handleDialogClose}
                    />
                )}
            </Fragment>
        )
    };

    async foo(id) {
        console.log(id);
        axios.get(`http://localhost:8000/sinfApi/supplier/invoice` + id)
            .then(res => {
                console.log(res.data);
            })
    }

    async componentDidMount() {
        axios.get(`http://localhost:8000/sinfApi/login`)
            .then(res =>
                axios.get(`http://localhost:8000/sinfApi/client/order-requests`)
                    .then(res => {
                        this.setState(
                            {
                                pendings: res.data.filter(p => p.status === 'pending'),
                                accepted: res.data.filter(p => p.status === 'accepted')
                            }
                        );
                    })
            );
    }

    async handleReject(id) {
        axios.patch(`http://localhost:8000/sinfApi/client/order-requests/` + id + '/reject')
            .then(res => {
                console.log(res.data);
            });
    }

    async handleAccept(id) {

        axios.patch(`http://localhost:8000/sinfApi/client/order-requests/` + id + `/accept`)
            .then(res => {
                console.log(res.data);
            });
    }

    async handleInvoice(id) {
        axios.get(`http://localhost:8000/sinfApi/supplier/invoice/` + id)
            .then(res =>
                console.log(res.data)
                )
    }

    handleDialogClose() {
        this.setState({ showDialog: false });
    }

}
