// Copyright (C) 2023 Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.
import React, { Component } from "react";

type State = {};

type Props = {};

export default class Template extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {}

    componentWillUnmount() {}

    render() {
        return <div />;
    }
}
