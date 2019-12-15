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
import { Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
      width: '100%',
      '& h3': {
        color: '#ff9900',
        'font-size': '30px',
        'font-weight': '300',
        'letter-spacing': '9px',
      }

  },
  paper: {
      marginTop: theme.spacing(3),
      width: '75%',
      overflowX: 'auto',
      margin: 'auto',
      marginBottom: theme.spacing(2),
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
  },
  table: {
      minWidth: 500,
  },

  button: {
    background: 'rgba(0, 0, 0, .25)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
  },
}));

export default function InvoiceRequests(props) {
    const classes = useStyles();

    const { headings, rows, handleInvoice } = props;


    return (
        <div className={classes.root}>

            <Paper className={classes.paper}>

                <Container><h3>Order Request</h3></Container>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{headings[0]}</TableCell>
                            <TableCell align="right">{headings[1]}</TableCell>
                            <TableCell align="right">{headings[2]}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    <Grid item>
                                        <ButtonGroup>
                                            <Button onClick={handleInvoice.bind(this, row.id)}>Invoice</Button>
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
