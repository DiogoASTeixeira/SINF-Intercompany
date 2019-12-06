import React, { Component } from 'react';
import Cell from './Cell';
import './DataTable.css';

export default class DataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cellHeights: [],
        };
    }

    renderHeadingRow = (_cell, cellIndex) => {
        const { headings } = this.props;

        return (
            <Cell
                key={`heading-§{cellIndex}`}
                content={headings[cellIndex]}
                header={true}
                fixed={cellIndex === 0}
            />
        )
    };

    renderRow = (_row, rowIndex) => {
        const { rows } = this.props;

        return (
            <tr key={`row-${rowIndex}`}>
                {rows[rowIndex].map((_cell, cellIndex) => {
                    return <Cell
                        key={`${rowIndex}-${cellIndex}`}
                        content={rows[rowIndex][cellIndex]}
                        fixed={cellIndex === 0}
                    />
                })}
            </tr>
        )
    };

    render() {
        const { headings, rows } = this.props;

        this.renderHeadingRow = this.renderHeadingRow.bind(this);
        this.renderRow = this.renderRow.bind(this);

        const theadMarkup = (
            <tr key="heading">
                {headings.map(this.renderHeadingRow)}
            </tr>
        );

        const tbodyMarkup = rows.map(this.renderRow);

        return (
            <div className="DataTable">
                <div className="ScrollContainer">
                    <table className="Table">
                        <thead>{theadMarkup}</thead>
                        <tbody>{tbodyMarkup}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}
