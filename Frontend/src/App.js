import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Helmet from "react-helmet";
// import Table from './components/Table';
import PurchaseOrder from './components/PurchaseOrder';
import DataTable from './components/DataTable/DataTable';
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
        const headings = [
            'Product ID',
            'Product name',
            'Wholesale cost',
        ];

        const rows = [
            [
                124689325,
                'Red and black plaid scarf',
                '$35.00',
            ],
            [
                124689389,
                'Yellow plaid scarf',
                '$60.00',
            ],
            [
                124689332,
                'Blue plaid scarf',
                '$35.00',
            ],
            [
                124689376,
                'Pink plaid scarf',
                '$35.00',
            ],
        ];
        //TODO
        return (
            // <div className="container">
            //     <Table characterData={characters} removeCharacter={this.removeCharacter} />
            //     <PurchaseOrderForm handleSubmit={this.handleSubmit} />
            // </div>
            <div className="application">
            <TopNav />


                <Helmet>
                    <meta charset="utf-12" />
                    <title>SINF InterCompany</title>
                </Helmet>
                <Router>
                    <div>
                        <Switch>
                            <Route path="/purchaseOrder">
                                <PurchaseOrder handleSubmit={this.handleSubmit} />
                            </Route>
                            <Route path="/salesOrder">
                                <SalesOrder handleSubmit={this.handleSubmit} />
                            </Route>
                            <Route path="/validState">
                                <ValidState/>
                            </Route>
                            <Route path="/">
                                {/* This is a test */}
                              {/* <DataTable headings={headings} rows={rows}/> */}
                              {  /*<Topics />*/}
                              <Table/>
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

function Topics() {
    let match = useRouteMatch();

    return (
        <div>
            <h2>Topics</h2>

            <ul>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
            </Link>
                </li>
            </ul>

            {/* The Topics page has its own <Switch> with more routes
            that build on the /topics URL path. You can think of the
            2nd <Route> here as an "index" page for all topics, or
            the page that is shown when no topic is selected */}
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic />
                </Route>
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    );
}

function Topic() {
    let { topicId } = useParams();
    return <h3>Requested topic ID: {topicId}</h3>;
}
