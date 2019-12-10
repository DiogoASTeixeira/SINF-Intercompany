import React, { Component } from 'react';
import DataTable from './DataTable/DataTable';
import LinkButton from './LinkButton';

export default class ValidState extends Component {
    constructor() {
        super();

        this.state = {
            headings: [
                'Reference',
                'Date',
                'Serial Number',
                'Total',
                'Validate'
            ],
            rows: [
                [
                    '25749',
                    10052019,
                    980572304,
                    10,
                    <LinkButton to='/salesOrder/25749'>Validate</LinkButton>
                ],
                [
                    '87450',
                    9062017,
                    988047340,
                    234,
                    <LinkButton to='/salesOrder/87450'>Validate</LinkButton>
                ]
            ]
        };
    }

    render() {
        const { headings, rows } = this.state;
        return <DataTable headings={headings} rows={rows} title="Valid State Table" />;
    }
}
