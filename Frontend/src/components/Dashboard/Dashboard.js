import React, { Component } from 'react';
import Helmet from "react-helmet";

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <Helmet>
                    <meta charset="utf-12" />
                    <title>DashBoard - Client</title>
                </Helmet>
                Dashboard Client
            </div>
        )
    }
}
