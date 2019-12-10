import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

export default class LabelNumberInput extends Component {
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <NumberFormat
                    format={this.props.format}
                    placeholder={this.props.placeholder}
                    mask={this.props.mask}
                    suffix={this.props.suffix}
                    min={this.props.min}
                    max={this.props.max}
                    decimalScale={this.props.decimalScale}
                    fixedDecimalScale={this.props.fixedDecimalScale}
                    
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}
