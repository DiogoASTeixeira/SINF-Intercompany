import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

function createData(name, description, warehouse, quantity, unit, unitPrice, discount, shippingDate, iva, total) {
    return { name, description, warehouse, quantity, unit, unitPrice, discount, shippingDate, iva, total };
}

function getTotal() {
    let totalValue = 0;
    rows.map(row => (
        totalValue += row.total
    ));

    return parseFloat(Math.round(totalValue * 100) / 100).toFixed(2);
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 1, 2, 3, 4, 5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 6, 7, 8, 9, 10),
    createData('Eclair', 262, 16.0, 24, 6.0, 1, 2, 3, 4, 5),
    createData('Cupcake', 305, 3.7, 67, 4.3, 6, 7, 8, 9, 10),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1, 2, 3, 4, 5),
];

export default function PurchaseOrderTable() {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Artigo</TableCell>
                        <TableCell align="right">Descrição</TableCell>
                        <TableCell align="right">Armazém</TableCell>
                        <TableCell align="right">Quantidade</TableCell>
                        <TableCell align="right">Unidade</TableCell>
                        <TableCell align="right">Preço Unitário</TableCell>
                        <TableCell align="right">Desconto</TableCell>
                        <TableCell align="right">Data de Envio</TableCell>
                        <TableCell align="right">Tipo de IVA</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.warehouse}</TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.unit}</TableCell>
                            <TableCell align="right">{row.unitPrice}</TableCell>
                            <TableCell align="right">{row.discount}</TableCell>
                            <TableCell align="right">{row.shippingDate}</TableCell>
                            <TableCell align="right">{row.iva}</TableCell>
                            <TableCell align="right">{row.total}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="table-total">
                <label id="label-total">Total</label>
                <label id="total-value">{getTotal()}</label>
            </div>
        </Paper>
    );
}
