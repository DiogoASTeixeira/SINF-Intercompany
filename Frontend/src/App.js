import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Helmet from "react-helmet";
import PurchaseOrder from './components/PurchaseOrder';
import Dashboard from './components/Dashboard/Dashboard';
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
                    <title>Client Intercompany</title>
                </Helmet>
                <Router>
                    <div>
                        <TopNav />
                        <Switch>
                            <Route path="/purchaseOrders">
                                <PurchaseOrder handleSubmit={this.handleSubmit} />
                            </Route>
                            <Route path="/dashboard">
                                <Dashboard />
                            </Route>
                            <Route path="/">
                                <Dashboard />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
