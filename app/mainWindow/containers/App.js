// Copyright (C) 2023 Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.
import * as React from "react";

type Props = {
    children: React.Node
};

export default class App extends React.Component<Props> {
    props: Props;

    render() {
        const { children } = this.props;
        return <React.Fragment>{children}</React.Fragment>;
    }
}
