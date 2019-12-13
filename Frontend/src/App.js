import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Helmet from "react-helmet";
// import Table from './components/Table';
import PurchaseOrder from './components/PurchaseOrder';
// import DataTable from './components/DataTable/DataTable';
import Table from './components/DataTable/NewTable';
import SalesOrder from './components/SalesOrder';
import ValidState from './components/ValidState';
import TopNav from './components/navbar/TopNav';
import './App.css';

export default class App extends Component {
    state = {
        characters: []
    }
    render() {

        // const { characters } = this.state;
        ///TODO
        // const headings = [
        //     'Product ID',
        //     'Product name',
        //     'Wholesale cost',
        // ];

        // const rows = [
        //     [
        //         124689325,
        //         'Red and black plaid scarf',
        //         '$35.00',
        //     ],
        //     [
        //         124689389,
        //         'Yellow plaid scarf',
        //         '$60.00',
        //     ],
        //     [
        //         124689332,
        //         'Blue plaid scarf',
        //         '$35.00',
        //     ],
        //     [
        //         124689376,
        //         'Pink plaid scarf',
        //         '$35.00',
        //     ],
        // ];
        return (
            <div className="application">
                <Helmet>
                    <meta charset="utf-12" />
                    <title>SINF InterCompany</title>
                </Helmet>
                <Router>
                    <div>
                        <TopNav />
                        <Switch>
                            <Route path="/purchaseOrder">
                                <PurchaseOrder handleSubmit={this.handleSubmit} />
                            </Route>
                            <Route path="/salesOrder">
                                <SalesOrder handleSubmit={this.handleSubmit} />
                            </Route>
                            <Route path="/validState">
                                <ValidState />
                            </Route>
                            <Route path="/">
                                {/* TODO DashBoard */}
                                <Table />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }


    removeCharacter = index => {
        const { characters } = this.state
        console.log(this.state);
        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index
            })
        })
    }

    handleSubmit = character => {
        this.setState({ characters: [...this.state.characters, character] });
    }




}
