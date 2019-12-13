import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
        minWidth: 650,
    },
}));

export default function ProductTable(props) {
    const classes = useStyles();

    const { headings, rows, handleDetails, handleOrder } = props;


    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{headings[0]}</TableCell>
                            <TableCell align="right">{headings[1]}</TableCell>
                            <TableCell align="right">{headings[2]}</TableCell>
                            <TableCell align="right">{headings[3]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.id}</TableCell>
                                <TableCell align="right">
                                    <Grid item>
                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                            <Button onClick={handleDetails.bind(this, row.id)}>Details</Button>
                                            <Button onClick={handleOrder.bind(this, row.id)}>Order</Button>
                                        </ButtonGroup>
                                    </Grid>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}