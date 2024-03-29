// Copyright (C) 2023 Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.
import React, { Component } from "react";
import AddressBook from "../components/AddressBook";

type Props = {};

export default class AddressBookPage extends Component<Props> {
    props: Props;

    render() {
        return <AddressBook />;
    }
}
