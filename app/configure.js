// Copyright (C) 2018, Zpalmtree
// Copyright (C) 2019, WrkzCoin
// Copyright (C) 2023, Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.

import { MixinLimit, MixinLimits, Daemon } from "zentcash-wallet-backend";
import { name, version } from "../package.json";

const configure = {
    /**
     * If you can't figure this one out, I don't have high hopes
     */
    coinName: "Bitcoin Nova",

    /**
     * Prefix for URI encoded addresses
     */
    uriPrefix: "bitcoinnova://",

    /**
     * How often to save the wallet, in milliseconds
     */
    walletSaveFrequency: 60 * 1000,

    /**
     * The amount of decimal places your coin has, e.g. Bitcoin Nova has six
     * decimals
     */
    decimalPlaces: 6,

    /**
     * The address prefix your coin uses - you can find this in CryptoNoteConfig.h.
     * In Bitcoin Nova this converts to E
     */
    addressPrefix: 78,

    /**
     * Request timeout for daemon operations in milliseconds
     */
    requestTimeout: 30 * 1000,

    /**
     * The block time of your coin, in seconds
     */
    blockTargetTime: 120,

    /**
     * How often to process blocks, in millseconds
     */
    syncThreadInterval: 10,

    /**
     * How often to update the daemon info, in milliseconds
     */
    daemonUpdateInterval: 15 * 1000,

    /**
     * How often to check on locked transactions
     */
    lockedTransactionsCheckInterval: 30 * 1000,

    /**
     * The amount of blocks to process per 'tick' of the mainloop. Note: too
     * high a value will cause the event loop to be blocked, and your interaction
     * to be laggy.
     */
    blocksPerTick: 100,

    /**
     * Your coins 'ticker', generally used to refer to the coin, i.e. 123 BTN
     */
    ticker: "BTN",

    /**
     * Most people haven't mined any blocks, so lets not waste time scanning
     * them
     */
    scanCoinbaseTransactions: true,

    /**
     * Disable AutoOptimization by default
     */
    enableAutoOptimization: true,

    /**
     * The minimum fee allowed for transactions, in ATOMIC units
     */
    minimumFee: 10000,

    /**
     * Fee per byte height
     */
    feePerByteHeight: 2200000,

    /**
     * Mapping of height to mixin maximum and mixin minimum
     */
    mixinLimits: new MixinLimits(
        [
            /* Height: 440,000, minMixin: 0, maxMixin: 100, defaultMixin: 3 */
            new MixinLimit(440000, 0, 100, 3),

            /* At height of 620000, static mixin of 7 */
            new MixinLimit(620000, 2, 7, 7),

            /* At height of 800000, static mixin of 3 */
            new MixinLimit(712160, 1, 3, 3)
        ],
        3 /* Default mixin of 3 before block 440,000 */
    ),

    /**
     * The length of a standard address for your coin
     */
    standardAddressLength: 95,

    /**
     * The length of an integrated address for your coin - It's the same as
     * a normal address, but there is a paymentID included in there - since
     * payment ID's are 64 chars, and base58 encoding is done by encoding
     * chunks of 8 chars at once into blocks of 11 chars, we can calculate
     * this automatically
     */
    integratedAddressLength: 95 + (64 * 11) / 8,

    /**
     * Memory to use for storing downloaded blocks - 32MB
     */
    blockStoreMemoryLimit: 1024 * 1024 * 32,

    /**
     * Amount of blocks to request from the daemon at once
     */
    blocksPerDaemonRequest: 100,

    /**
     * User agent string
     */
    customUserAgentString: `${name}-v${version}`,

    customRequestOptions: { pool: { maxSockets: 100 }, agent: false },

    /**
     * Unix timestamp of the time your chain was launched.
     *
     * Note - you may want to manually adjust  Take the current timestamp,
     * take away the launch timestamp, divide by block time, and that value
     * should be equal to your current block count. If it's significantly different,
     * you can offset your timestamp to fix the discrepancy
     */
    chainLaunchTimestamp: new Date(1000 * 1550759396),

    /**
     * Base url for price API
     *
     * The program *should* fail gracefully if your coin is not supported, or
     * you just set this to an empty string. If you have another API you want
     * it to support, you're going to have to modify the code in Currency.js.
     */
    priceApiLink: "https://api.coingecko.com/api/v3/simple/price",
    
    coinNameCoingecko: "bitcoin-nova",
    
    DefaultDaemonRPCPort: "45223",

    nodeListURL: "https://raw.githubusercontent.com/BitcoinNova/bitcoinnova-mobile-nodes-json/master/bitcoinnova-mobile-nodes.json",

    currentHeightURL: "http://mn1.bitcoinnova.org:45223/height",

    explorerURL: "http://explorer.bitcoinnova.org/",

    githubRepo: "https://github.com/BitcoinNova/bitcoinnova-sonic-wallet",

    discordURL: "https://discord.gg/CXeKVqQ"
};

export default configure;