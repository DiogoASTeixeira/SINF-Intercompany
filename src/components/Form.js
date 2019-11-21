import React, { Component } from 'react'
import LabelInput from './LabelInput';

export default class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            name: '',
            job: ''
        }

        this.state = this.initialState;
    }


    render() {
        const { name, job } = this.state;

        return (
            <form>
                <LabelInput
                    label="Name"
                    name="name"
                    value={name}
                    onChangeFunction={this.handleChange}
                />
                <LabelInput
                    label="Job"
                    name="job"
                    value={job}
                    onChangeFunction={this.handleChange}
                />
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
        );
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }
}
