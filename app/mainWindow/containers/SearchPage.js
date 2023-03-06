// Copyright (C) 2023 Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.
import React, { Component } from "react";
import Search from "../components/Search";

type Props = {
    match: {
        params: {
            query: string
        }
    }
};

export default class SearchPage extends Component<Props> {
    props: Props;

    render() {
        // prettier-ignore
        const { match: { params: { query } } } = this.props;
        return <Search query={query} />;
    }
}
