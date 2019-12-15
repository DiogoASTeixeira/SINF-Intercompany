import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Helmet from "react-helmet";
import SalesOrder from './components/SalesOrder';
import TopNav from './components/navbar/TopNav';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';

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
                            <Route path="/salesOrders">
                                <SalesOrder/>
                            </Route>
                            <Route path="/dashboard">
                                <Dashboard/>
                            </Route>
                            <Route path="/">
                                <Dashboard/>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}
