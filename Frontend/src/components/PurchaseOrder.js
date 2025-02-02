import React, { Component, Fragment } from 'react';
import Helmet from "react-helmet";
import ProductTable from './Table/ProductTable';
import axios from 'axios';
import PopupWindow from './Popup/PopupWindow';
import OrderRequest from './Table/OrderRequest';

export default class PurchaseOrder extends Component {
    constructor() {
        super();

        this.state = {
            productHeadings: ['Name', 'Price', 'Actions'],
            products: [],
            orderHeadings: ['Product', 'Date', 'Status', 'Action'],
            orders: [],
            showDialog: false,
            dialogContent: []
        };

        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
        this.handleOrderCancel = this.handleOrderCancel.bind(this);

    }
    render() {
        const { productHeadings, products, orderHeadings, orders } = this.state;

        return (
            <Fragment>
                <Helmet>
                    <meta charset="utf-8" />
                    <title>Purchase Order</title>
                </Helmet>

                <ProductTable
                    headings={productHeadings}
                    rows={products}
                    handleDetails={this.handleDetails}
                    handleOrder={this.handleOrder}
                />

                <OrderRequest
                    headings={orderHeadings}
                    rows={orders}
                    handleCancel={this.handleOrderCancel}
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

    async componentWillMount() {
        await axios.get(`http://localhost:8000/sinfApi/login`)
            .then(console.log('Logged in'));
    }

    async componentDidMount() {
        await axios.get(`http://localhost:8000/sinfApi/supplier/products`)
            .then(res => {
                const products = res.data;
                this.setState({ products: products });
            });
        await axios.get(`http://localhost:8000/sinfApi/client/order-requests`)
            .then(res => {
                const orders = res.data;
                this.setState({ orders: orders });
            });
    }

    async handleOrder(id, e) {
        await axios.post(`http://localhost:8000/sinfApi/supplier/products/` + id + '/order-request')
            .then(res => {
                console.log(res);
            });
        window.location.reload();
    }

    async handleDetails(id) {

        await axios.get(`http://localhost:8000/sinfApi/supplier/products/` + id)
            .then(res => {
                this.setState({ showDialog: true, dialogContent: res.data });
            });
    }

    async handleOrderCancel(id) {
        await axios.delete("http://localhost:8000/sinfApi/client/" + id + "/order-request").then()

        window.location.reload();
    }

    handleDialogClose() {
        this.setState({ showDialog: false });
    }

}
