import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    paper: {
        marginTop: theme.spacing(3),
        width: '75%',
        overflowX: 'auto',
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    table: {
        minWidth: 500,
    },
}));

export default function ProductAmountProftTable(props) {
    const classes = useStyles();

    const { headings, rows } = props;

    let sortRows = rows.sort((a, b) => { return b.profit - a.profit; });


    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>

                <Container><h3>Most Profitable Products</h3></Container>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{headings[0]}</TableCell>
                            <TableCell align="right">{headings[1]}</TableCell>
                            <TableCell align="right">{headings[2]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>


                        {sortRows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.units}</TableCell>
                                <TableCell align="right">{row.profit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}