import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Helmet from "react-helmet";
import PurchaseOrder from './components/PurchaseOrder';
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
        return (
            <div className="application">
                <Helmet>
                    <meta charset="utf-12" />
                    <title>Supplier Intercompany</title>
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
