// Copyright (C) 2023 Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.
import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import type { Store } from "../reducers/types";
import Routes from "../Routes";

type Props = {
    store: Store,
    history: {}
};

export default class Root extends Component<Props> {
    render() {
        const { store, history } = this.props;
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Routes />
                </ConnectedRouter>
            </Provider>
        );
    }
}
