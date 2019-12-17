import React, { Component } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';

export default class TotalIncome extends Component {
    constructor() {
        super();
        this.state = {
            totalIncome: 0
        }
    }

    render() {
        const { totalIncome } = this.state;
        return (
            <Container id='income-container'>
                <h3 id='income-header'>
                    Total Income
                </h3>
                <p id='income-value' >
                    {(Math.round(totalIncome * 100) / 100).toFixed(2)} €
                </p>
            </Container>
        )
    }

    componentDidMount = () => {
        axios.get('http://localhost:8000/sinfApi/stats/total-income')
            .then(res => {
                this.setState({ totalIncome: res.data.totalIncome })
            });
    }
}
