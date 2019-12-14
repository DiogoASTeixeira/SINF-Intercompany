import React, { Component } from 'react';
import LabelTextInput from './LabelTextInput';
import LabelNumberInput from './LabelNumberInput';

export default class SalesOrderForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            docType: '',
            serial: '',
            number: '',
            date: this.getCurrentDate(),
            reference: '',
            client: '',
            paymentCondition: '',
            discount: '0.00',
            dueDate: this.getCurrentDate(),
            paymentMethod: ''
        }

        this.state = this.initialState;
    }


    render() {
        const { docType, serial, number, date, reference, client, paymentCondition, discount, dueDate, paymentMethod } = this.state;

        return (
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
                    label="Cliente"
                    name="client"
                    value={client}
                    onChange={this.handleChange}
                />
                <LabelTextInput
                    id="paymentCondition"
                    label="Condição de Pagamento"
                    name="paymentCondition"
                    value={paymentCondition}
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
                <LabelNumberInput
                    label="Data de Vencimento"
                    format="##/##/####"
                    placeholder="DD/MM/YYYY"
                    mask={['D', 'D', 'M', 'M', 'Y', 'Y', 'Y', 'Y']}
                    name="dueDate"
                    value={dueDate}
                    onChange={this.handleChange}
                />
                <LabelTextInput
                    label="Método de Pagamento"
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={this.handleChange}
                />
                <input className="submit-order" type="button" value="Submit" onClick={this.submitForm} />
            </form>
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
