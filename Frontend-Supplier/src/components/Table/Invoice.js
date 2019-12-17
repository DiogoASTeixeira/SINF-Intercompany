import React, { Component } from "react";
import Image from 'react-bootstrap/Image';
import { Table, TableCell, TableRow, TableHead, TableBody, Container } from '@material-ui/core';

// import './../../styles/font.css';
import './Invoice.css';

export default class Invoice extends Component {
    render() {
        let { content } = this.props;
        console.log(content);
        return (
            <Container>
                <Image src={require("../../resources/supplier.png")} alt="Marcia Meira, Lda" fluid />
                <h3>Invoice</h3>

                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <label>Seller</label>
                            </TableCell>
                            <TableCell>
                                {content.seller}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Buyer</label>
                            </TableCell>
                            <TableCell>
                                {content.buyer}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Buyer NIF</label>
                            </TableCell>
                            <TableCell>
                                {content.nifClient}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Invoice Number</label>
                            </TableCell>
                            <TableCell>
                                {content.keyName}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Invoice Date</label>
                            </TableCell>
                            <TableCell>
                                {content.date}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Delivery Method</label>
                            </TableCell>
                            <TableCell>
                                {content.deliveryMethod}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <label>Payment Method</label>
                            </TableCell>
                            <TableCell>
                                {content.paymentMethod}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <label>#</label>
                            </TableCell>
                            <TableCell>
                                <label>Description</label>
                            </TableCell>
                            <TableCell align='right'>
                                <label>Price</label>
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow>
                            <TableCell>
                                1
                                </TableCell>
                            <TableCell>
                                {content.productDescription}
                            </TableCell>
                            <TableCell>
                                {twoDecimals(content.grossValue)} €
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <Table>
                    <TableBody>
                        <TableRow>

                            <TableCell>
                                <label>Discount</label>
                            </TableCell>
                            <TableCell>
                                {twoDecimals(content.discount)} %
                            </TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell>
                                <label>Discount Value</label>
                            </TableCell>
                            <TableCell>
                                {twoDecimals(content.discountValue)} €
                        </TableCell>
                        </TableRow>
                        <TableRow>

                            <TableCell>
                                <label>Taxes</label>
                            </TableCell>
                            <TableCell>
                                {twoDecimals(content.taxTotal * 100)} %
                        </TableCell>
                        </TableRow>

                        <TableRow>

                            <TableCell>
                                <label>Total</label>
                            </TableCell>
                            <TableCell>
                                {twoDecimals(content.totalValue)} €
                        </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </Container>
        );
    }
}

function twoDecimals(n) { return (Math.round(n * 100) / 100).toFixed(2); }