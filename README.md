# Bitcoin Nova Sonic Wallet

![Download Count](https://img.shields.io/github/downloads/BitcoinNova/bitcoinnova-sonic-wallet/total.svg)
![Open Issue Count](https://img.shields.io/github/issues/BitcoinNova/bitcoinnova-sonic-wallet)
![License](https://img.shields.io/github/license/BitcoinNova/bitcoinnova-sonic-wallet)
![Version](https://img.shields.io/github/v/release/BitcoinNova/bitcoinnova-sonic-wallet)


### Master Build Status

[![Build Bitcoin Nova Wallet](https://github.com/BitcoinNova/bitcoinnova-sonic-wallet/actions/workflows/matrix.yml/badge.svg?branch=master)](https://github.com/BitcoinNova/bitcoinnova-sonic-wallet/actions/workflows/matrix.yml)

<img src="https://raw.githubusercontent.com/BitcoinNova/bitcoinnova-sonic-wallet/master/screenshots/screenshot.png">
<p>
  Bitcoin Nova Sonic Wallet is a Bitcoin Nova wallet that uses <a href="http://electron.atom.io/">Electron</a>, <a href="https://facebook.github.io/react/">React</a>, and <a href="https://github.com/BitcoinNova/bitcoinnova-wallet-backend-js">BitcoinNova-Wallet-Backend-JS</a>.
</p>

## Installing

**Check out the full tutorial on how to install and use this wallet at the [official bitcoin nova docs page](http://docs.bitcoinnova.org/guides/wallets/using-bitcoinnova-sonic-wallet)!**

## Development Setup (All Platforms)

### Dependencies

#### You will need the following dependencies installed before you can proceed to the "Setup" step:

-   Node.JS (latest LTS 14.x) https://nodejs.org/

-   Yarn https://yarnpkg.com/en/

-   Git https://git-scm.com/downloads

Tip: If you already have a different version of node.js installed besides 14.x, try using [Node Version Manager](https://github.com/nvm-sh/nvm#install--update-script).

#### Setup

First, clone the repo via git:

```bash
git clone https://github.com/BitcoinNova/bitcoinnova-sonic-wallet.git
```

And then install the dependencies with yarn.

```bash
$ cd bitcoinnova-sonic-wallet
$ yarn
```

Run the wallet.

```bash
$ yarn start
```

### Starting Development

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ yarn dev
```

### Packaging

To package apps for the local platform:

```bash
$ yarn package
```
