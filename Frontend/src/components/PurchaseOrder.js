import React, { Component, Fragment } from 'react';
import Helmet from "react-helmet";
// import PurchaseOrderForm from './PurchaseOrderForm';
// import PurchaseOrderTable from './PurchaseOrderTable';
import ProductTable from './Table/ProductTable';
import axios from 'axios';

export default class PurchaseOrder extends Component {

    state = {
        headings: ['Name', 'Price', 'ID', 'Actions'],
        products: []
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
            </Fragment>
        )
    };

    componentDidMount() {
        axios.get(`http://localhost:8000/sinfApi/supplier/products`)
            .then(res => {
                const products = res.data;
                this.setState({ products: products });
            });
    }

    handleOrder(id, e) {
        console.log(id);
    }

    handleDetails(id, e) {
        axios.get(`http://localhost:8000/sinfApi/supplier/products/` + id)
        .then(res => {
            console.log(res.data.description);
        })
    }

}
