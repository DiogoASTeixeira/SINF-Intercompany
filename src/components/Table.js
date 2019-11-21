import React, { Component } from 'react'

class Table extends Component {
    render() {

        const { characterData, removeCharacter } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody characterData={characterData} removeCharacter={removeCharacter} />
            </table>)
    }
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>DocType</th>
                <th>Serial</th>
            </tr>
        </thead>
    )
}

const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index} >
                <td>{row.docType}</td>
                <td>{row.serial}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr >
        )
    })
    return <tbody>{rows}</tbody>
}

export default Table
