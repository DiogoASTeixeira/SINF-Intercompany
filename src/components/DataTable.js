import React, { Component } from 'react'
import Cell from './Cell';

export default class DataTable extends Component {

    renderHeadingRow = (_cell, cellIndex) => {
        const { headings } = this.props;

        return (
            <Cell
                key={`heading-§{cellIndex}`}
                content={headings[cellIndex]}
                header={true}
            />
        )
    };

    renderRow = (_row, rowIndex) => {
        const { rows } = this.props;

        return (
            <tr key={`row-${rowIndex}`}>
                {rows[rowIndex].map((_cell, cellIndex) => {
                    <Cell
                        key={`${rowIndex}-${cellIndex}`}
                        content={rows[rowIndex][cellIndex]}
                    />
                })}
            </tr>
        )
    };

    render() {
        return (
            <div>

            </div>
        )
    }
}
