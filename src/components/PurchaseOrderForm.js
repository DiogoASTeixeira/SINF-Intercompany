import React, { Component } from 'react';
import Helmet from "react-helmet";
import LabelTextInput from './LabelTextInput';
import LabelNumberInput from './LabelNumberInput';

export default class PurchaseOrderForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            docType: '',
            serial: '',
            number: '',
            date: this.getCurrentDate(),
            reference: '',
            supplier: '',
            paymentCondition: '',
            supplyCondition: '',
            discount: '0.00'
        }

        this.state = this.initialState;
    }


    render() {
        const { docType, serial, number, date, reference, supplier, paymentCondition, supplyCondition, discount } = this.state;

        return (
            <div>
                <Helmet>
                    <meta charset="utf-8" />
                    <title>Purchase Order Form</title>
                </Helmet>
                <form className="order-form">
                    <LabelTextInput
                        label="Tipo de Documento"
                        name="docType"
                        value={docType}
                        onChange={this.handleChange}
                    />
                    <LabelNumberInput
                        label="Série"
                        format="#### #### #### ####"
                        name="serial"
                        value={serial}
                        onChange={this.handleChange}
                    />
                    <LabelNumberInput
                        label="Número"
                        name="number"
                        value={number}
                        onChange={this.handleChange}
                    />
                    <LabelNumberInput
                        label="Data"
                        format="##/##/####"
                        placeholder="DD/MM/YYYY"
                        mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']}
                        name="date"
                        value={date}
                        onChange={this.handleChange}
                    />
                    <LabelNumberInput
                        label="Referência"
                        name="reference"
                        value={reference}
                        onChange={this.handleChange}
                    />

                    <LabelTextInput
                        label="Fornecedor"
                        name="supplier"
                        value={supplier}
                        onChange={this.handleChange}
                    />
                    <LabelTextInput
                        id="paymentCondition"
                        label="Condição de Pagamento"
                        name="paymentCondition"
                        value={paymentCondition}
                        onChange={this.handleChange}
                    />
                    <LabelTextInput
                        label="Condição de Envio"
                        name="supplyCondition"
                        value={supplyCondition}
                        onChange={this.handleChange}
                    />
                    <LabelNumberInput
                        label="Desconto"
                        suffix="%"
                        decimalScale="2"
                        fixedDecimalScale="true"
                        name="discount"
                        value={discount}
                        onChange={this.handleDiscountChange}
                    />
                    <input className="submit-order" type="button" value="Submit" onClick={this.submitForm} />
                </form>
            </div>
        );
    }

    handleDiscountChange = event => {
        const { name, value } = event.target;
        let parsedVal = parseFloat(value);
        this.setState({
            [name]: this.discountLimit(parsedVal)
        });

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    getCurrentDate(separator = '') {
        let newDate = new Date();
        let day = newDate.getDate();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        console.log(`${day}${month < 10 ? `0${month}` : `${month}`}${year}`);
        return `${day}${month < 10 ? `0${month}` : `${month}`}${year}`;
    }

    discountLimit(val) {
        return this.minMaxNumberLimit(val, 0.00, 100.00);
    }

    minMaxNumberLimit(val, min, max) {
        if (val < min) return `${min}`;
        if (val > max) return `${max}`;
        else return `${val}`;
    }
}
