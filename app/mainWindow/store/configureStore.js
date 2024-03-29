// Copyright (C) 2023 Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.
import configureStoreDev from "./configureStore.dev";
import configureStoreProd from "./configureStore.prod";

const selectedConfigureStore =
    process.env.NODE_ENV === "production"
        ? configureStoreProd
        : configureStoreDev;

export const { configureStore } = selectedConfigureStore;

export const { history } = selectedConfigureStore;
