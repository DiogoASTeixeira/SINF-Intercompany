import React, { Component } from 'react'

export default class LabelTextInput extends Component {
    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <input
                    type="text"
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>
        )
    }
}
