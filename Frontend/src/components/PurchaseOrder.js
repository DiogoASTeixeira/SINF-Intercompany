import React, { Component, Fragment } from 'react';
import Helmet from "react-helmet";
// import PurchaseOrderForm from './PurchaseOrderForm';
// import PurchaseOrderTable from './PurchaseOrderTable';
import ProductTable from './Table/ProductTable';
import axios from 'axios';
import PopupWindow from './Popup/PopupWindow';

export default class PurchaseOrder extends Component {
    constructor() {
        super();

        this.state = {
            headings: ['Name', 'Price (€)', 'Actions'],
            products: [],
            showDialog: false,
            dialogContent: []
        };

        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
    }
    render() {
        const { headings, products } = this.state;

        return (
            <Fragment>
                <Helmet>
                    <meta charset="utf-8" />
                    <title>Purchase Order</title>
                </Helmet>

                <ProductTable
                    headings={headings}
                    rows={products}
                    handleDetails={this.handleDetails}
                    handleOrder={this.handleOrder}
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



   async componentDidMount() {
        axios.get(`http://localhost:8000/sinfApi/login`)
            .then(
                axios.get(`http://localhost:8000/sinfApi/supplier/products`)
                    .then(res => {
                        const products = res.data;
                        this.setState({ products: products });
                    }));
    }

    async handleOrder(id, e) {
        axios.post(`http://localhost:8000/sinfApi/supplier/products/` + id + '/order-request')
            .then(res => {
                console.log(res);
            });
    }

   async handleDetails(id) {
       
        axios.get(`http://localhost:8000/sinfApi/supplier/products/` + id)
            .then(res => {
                this.setState({ showDialog: true, dialogContent: res.data });
            });
    }

    handleDialogClose() {
        this.setState({ showDialog: false });
    }

}
