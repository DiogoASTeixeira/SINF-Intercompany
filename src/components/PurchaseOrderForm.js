import React, { Component } from 'react'
import LabelInput from './LabelInput';

export default class PurchaseOrderForm extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            docType: '',
            serial: '',
            number: '',
            date: '',
            reference: '',
            supplier: '',
            paymentCondition: '',
            supplyCondition: '',
            discount: ''
        }

        this.state = this.initialState;
    }


    render() {
        const { docType, serial, number } = this.state;

        return (
            <form>
                <LabelInput
                    label="Tipo de Documento"
                    name="docType"
                    value={docType}
                    onChange={this.handleChange}
                />
                <LabelInput
                    label="Série"
                    name="serial"
                    value={serial}
                    onChange={this.handleChange}
                />
                <LabelInput
                    label="Número"
                    name="number"
                    value={number}
                    onChange={this.handleChange}
                />
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
        )
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
}
