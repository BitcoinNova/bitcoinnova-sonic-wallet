// Copyright (C) 2020 Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.
import { app, Menu, shell, BrowserWindow } from 'electron';
import log from 'electron-log';
import LocalizedStrings from 'react-localization';
import npmPackage from '../package.json';

export const il8n = new LocalizedStrings({
  // eslint-disable-next-line global-require
  en: require('./il8n/en-menu.json')
});

const { version: currentVersion } = npmPackage;
const { productName } = npmPackage;

export default class MenuBuilder {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.DEBUG_PROD === 'true'
    ) {
      this.setupDevelopmentEnvironment();
    }

    const template =
      process.platform === 'darwin'
        ? this.buildDarwinTemplate()
        : this.buildDefaultTemplate();

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    return menu;
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools();
  }

  buildDarwinTemplate() {
    const subMenuAbout = {
      label: `${productName}`,
      submenu: [
        {
          label: `${il8n.about} ${productName}`,
          click: () => {
            shell.openExternal(
              'https://github.com/BitcoinNova/bitcoinnova-sonic-wallet#readme'
            );
          }
        },
        { type: 'separator' },
        {
          label: `${il8n.hide} ${productName}`,
          accelerator: 'Command+H',
          selector: 'hide:'
        },
        {
          label: `${il8n.hide_others}`,
          accelerator: 'Command+Shift+H',
          selector: 'hideOtherApplications:'
        },
        { label: il8n.show_all, selector: 'unhideAllApplications:' },
        { type: 'separator' },
        {
          label: il8n.quit,
          accelerator: 'Command+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    };
    const subMenuFile = {
      label: il8n.file,
      submenu: [
        {
          label: 'Open',
          accelerator: 'Command+O',
          click: () => {
            this.handleOpen();
          }
        },
        {
          label: il8n.new,
          accelerator: 'Command+N',
          click: () => {
            this.handleNew();
          }
        },
        {
          label: il8n.restore,
          click: () => {
            this.handleRestore();
          }
        },
        {
          label: il8n.save,
          accelerator: 'Command+S',
          click: () => {
            this.handleSave();
          }
        },
        {
          label: il8n.save_copy,
          click: () => {
            this.handleSaveAs();
          }
        },
        {
          label: il8n.close,
          accelerator: 'Command+W',
          click: () => {
            this.mainWindow.close();
          }
        }
      ]
    };
    const subMenuEdit = {
      label: il8n.edit,
      submenu: [
        { label: il8n.undo, accelerator: 'Command+Z', selector: 'undo:' },
        { label: il8n.redo, accelerator: 'Shift+Command+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: il8n.cut, accelerator: 'Command+X', selector: 'cut:' },
        { label: il8n.copy, accelerator: 'Command+C', selector: 'copy:' },
        { label: il8n.paste, accelerator: 'Command+V', selector: 'paste:' },
        {
          label: il8n.select_all,
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    };
    const subMenuViewDev = {
      label: il8n.view,
      submenu: [
        {
          label: il8n.reload,
          accelerator: 'Command+R',
          click: () => {
            this.mainWindow.webContents.reload();
          }
        },
        {
          label: il8n.toggle_fullscreen,
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        },
        {
          label: il8n.toggle_devtools,
          accelerator: 'Alt+Command+I',
          click: () => {
            this.mainWindow.toggleDevTools();
          }
        }
      ]
    };
    const subMenuViewProd = {
      label: il8n.view,
      submenu: [
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+Command+F',
          click: () => {
            this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
          }
        }
      ]
    };
    const subMenuWallet = {
      label: il8n.wallet,
      submenu: [
        {
          label: il8n.password,
          click: () => {
            this.handlePasswordChange();
          }
        },
        {
          label: il8n.backup,
          click: () => {
            this.handleBackup();
          }
        },
        {
          label: il8n.lock,
          accelerator: 'Command+L',
          click: () => {
            this.handleLock();
          }
        }
      ]
    };
    const subMenuWindow = {
      label: il8n.window,
      submenu: [
        {
          label: il8n.minimize,
          accelerator: 'Command+M',
          selector: 'performMiniaturize:'
        },
        {
          label: il8n.close,
          accelerator: 'Command+W',
          selector: 'performClose:'
        },
        { type: 'separator' },
        { label: il8n.bring_all_front, selector: 'arrangeInFront:' }
      ]
    };
    const subMenuTools = {
      label: il8n.tools,
      submenu: [
        {
          label: il8n.export_csv,
          click: () => {
            this.handleExportToCsv();
          }
        }
      ]
    };
    const subMenuHelp = {
      label: il8n.help,
      submenu: [
        {
          label: il8n.support,
          click() {
            shell.openExternal('https://discord.gg/3XuP44z');
          }
        },
        {
          label: il8n.report_bug,
          click() {
            shell.openExternal(
              'https://github.com/BitcoinNova/bitcoinnova-sonic-wallet/issues'
            );
          }
        },
        {
          label: il8n.feature_request,
          click() {
            shell.openExternal(
              'https://github.com/BitcoinNova/bitcoinnova-sonic-wallet/issues'
            );
          }
        }
      ]
    };
    const subMenuDonate = {
      label: 'Donate',
      submenu: [
        {
          label: `Donate to the Developers`
        }
      ]
    };

    const subMenuView =
      process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

    return [
      subMenuAbout,
      subMenuFile,
      subMenuEdit,
      subMenuWallet,
      subMenuView,
      subMenuWindow,
      subMenuTools,
      subMenuHelp,
      subMenuDonate
    ];
  }

  handleSave() {
    this.mainWindow.webContents.send('handleSave');
  }

  handleOpen() {
    this.mainWindow.webContents.send('handleOpen');
  }

  handleSaveAs() {
    this.mainWindow.webContents.send('handleSaveAs');
  }

  handleBackup() {
    this.mainWindow.webContents.send('handleBackup');
  }

  handleNew() {
    this.mainWindow.webContents.send('handleNew');
  }

  handlePasswordChange() {
    this.mainWindow.webContents.send('handlePasswordChange');
  }

  handleExportToCsv() {
    this.mainWindow.webContents.send('exportToCSV');
  }

  handleLock() {
    this.mainWindow.webContents.send('handleLock');
  }

  handleRestore() {
    this.mainWindow.webContents.send('handleSaveSilent');
    log.debug('Import menu selected.');
    this.mainWindow.webContents.send('handleImport');
  }

  handleDonate() {
    this.mainWindow.webContents.send('handleDonate');
  }

  buildDefaultTemplate() {
    const templateDefault = [
      {
        label: il8n.file,
        submenu: [
          {
            label: il8n.open,
            accelerator: 'Ctrl+O',
            click: () => {
              this.handleOpen();
            }
          },
          {
            label: il8n.new,
            accelerator: 'Ctrl+N',
            click: () => {
              this.handleNew();
            }
          },
          {
            label: il8n.restore,
            click: () => {
              this.handleRestore();
            }
          },
          {
            label: il8n.save,
            accelerator: 'Ctrl+S',
            click: () => {
              this.handleSave();
            }
          },
          {
            label: il8n.save_copy,
            click: () => {
              this.handleSaveAs();
            }
          },
          {
            label: il8n.close,
            accelerator: 'Ctrl+W',
            click: () => {
              this.mainWindow.close();
            }
          }
        ]
      },
      {
        label: il8n.wallet,
        submenu: [
          {
            label: il8n.password,
            click: () => {
              this.handlePasswordChange();
            }
          },
          {
            label: il8n.backup,
            click: () => {
              this.handleBackup();
            }
          },
          {
            label: il8n.lock,
            accelerator: 'Ctrl+L',
            click: () => {
              this.handleLock();
            }
          }
        ]
      },
      {
        label: il8n.view,
        submenu:
          process.env.NODE_ENV === 'development'
            ? [
                {
                  label: il8n.reload,
                  accelerator: 'Ctrl+R',
                  click: () => {
                    this.mainWindow.webContents.reload();
                  }
                },
                {
                  label: il8n.toggle_fullscreen,
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                },
                {
                  label: il8n.toggle_devtools,
                  accelerator: 'Alt+Ctrl+I',
                  click: () => {
                    this.mainWindow.toggleDevTools();
                  }
                }
              ]
            : [
                {
                  label: il8n.toggle_fullscreen,
                  accelerator: 'F11',
                  click: () => {
                    this.mainWindow.setFullScreen(
                      !this.mainWindow.isFullScreen()
                    );
                  }
                }
              ]
      },
      {
        label: il8n.tools,
        submenu: [
          {
            label: il8n.export_csv,
            click: () => {
              this.handleExportToCsv();
            }
          }
        ]
      },
      {
        label: il8n.help,
        submenu: [

          {
            label: il8n.support,
            click: () => {
              shell.openExternal('https://discord.gg/3XuP44z');
            }
          },
          {
            label: il8n.about,
            click: () => {
              shell.openExternal(
                'https://github.com/BitcoinNova/bitcoinnova-sonic-wallet#readme'
              );
            }
          },
          {
            label: il8n.report_bug,
            click: () => {
              shell.openExternal(
                'https://github.com/BitcoinNova/bitcoinnova-sonic-wallet/issues'
              );
            }
          },
          {
            label: il8n.feature_request,
            click: () => {
              shell.openExternal(
                'https://github.com/BitcoinNova/bitcoinnova-sonic-wallet/issues'
              );
            }
          }
        ]
      },
      {
        label: 'Ecosystem',
        submenu: [
          {
            label: 'Website',
            click: () => {
              shell.openExternal(
                'https://www.bitcoinnova.org/'
              );
            }
          },
          {
            label: 'Wallets',
            submenu: [
              {
                label: 'Desktop Wallet',
                submenu: [
                  {
                    label: 'Bitcoin Nova Sonic Wallet (Official)',
                    click: () => {
                      shell.openExternal(
                        'https://github.com/BitcoinNova/bitcoinnova-sonic-wallet/releases'
                      );
                    }
                  },
                  {
                    label: 'Bitcoin Nova Nest Wallet (Official)',
                    click: () => {
                      shell.openExternal(
                        'https://github.com/BitcoinNova/BitcoinNova-Nest/releases'
                      );
                    }
                  },
                  {
                    label: 'Bitcoin Nova Electron Wallet (Official)',
                    click: () => {
                      shell.openExternal(
                        'https://github.com/BitcoinNova/bitcoinnova-wallet-electron/releases'
                      );
                    }
                  }
                ]
              },
              {
                label: 'Mobile Wallet',
                submenu: [
                  {
                    label: 'BitcoinNova Wallet Mobile - Android (Official)',
                    click: () => {
                      shell.openExternal(
                        'https://play.google.com/store/apps/details?id=com.bitcoinnova.mobile'
                      );
                    }
                  },
                  {
                    label: 'BitcoinNova Wallet Mobile - iOS (Official)',
                    click: () => {
                      shell.openExternal(
                        'https://play.google.com/store/apps/details?id=com.bitcoinnova.mobile'
                      );
                    }
                  }
                ]
              },
              {
                label: 'Web Wallet',
                submenu: [
                  {
                    label: 'Bitcoin Nova Web Wallet (Official)',
                    click: () => {
                      shell.openExternal(
                        'http://wallet.bitcoinnova.org/'
                      );
                    }
                  }
                ]
              },
              {
                label: 'Hardware Wallet',
                submenu: [
                  {
                    label: 'Ledger (Pending Development)',
                    click: () => {
                      shell.openExternal(
                        'https://www.ledger.com/'
                      );
                    }
                  },
                  {
                    label: 'Trezor (Pending Development)',
                    click: () => {
                      shell.openExternal(
                        'https://trezor.io/'
                      );
                    }
                  }
                ]
              },
              {
                label: 'Paper Wallet',
                submenu: [
                  {
                    label: 'Bitcoin Nova Paper Wallet Generator (Official)',
                    click: () => {
                      shell.openExternal(
                        'http://paperwallet.bitcoinnova.org/'
                      );
                    }
                  },
                  {
                    label: 'Bitcoin Nova Paper Wallet Offline (Official)',
                    click: () => {
                      shell.openExternal(
                        'http://offline.bitcoinnova.org/'
                      );
                    }
                  }
                ]
              }
            ]
          },
          {
            label: 'Nodes',
            submenu: [
              {
                label: 'Lightnight Nodes (Official)',
                click: () => {
                  shell.openExternal(
                    'http://lightnight.bitcoinnova.org/'
                  );
                }
              }
            ] 
          },
          {
            label: 'Explorers',
            submenu: [
              {
                label: 'Blocks Explorer (Official)',
                click: () => {
                  shell.openExternal(
                    'http://explorer.bitcoinnova.org/'
                  );
                }
              }
            ]
          },
          {
            label: 'Exchanges',
            /* submenu: [
              {
                label: 'Crypto Hub Exchange',
                click: () => {
                  shell.openExternal(
                    'https://cryptohubexchange.com/market/BTN/DOGE/'
                  );
                }
              }
            ]
          }, */
          {
            label: 'Merchants',
            /* submenu: [
              {
                label: '',
                click: () => {
                  shell.openExternal(
                    ''
                  );
                }
              }
            ] */
          },
          {
            label: 'Pools',
            submenu: [
              {
                label: 'Bitcoin Nova Pool (Official)',
                click: () => {
                  shell.openExternal(
                    'http://pool.bitcoinnova.org/'
                  );
                }
              },
              {
                label: 'SuperBlockchain Pool (Spain)',
                click: () => {
                  shell.openExternal(
                    'https://superblockchain.con-ip.com/btn/'
                  );
                }
              },
              {
                label: 'SemiPool (United States)',
                click: () => {
                  shell.openExternal(
                    'https://webbtn.semipool.com/#/dashboard'
                  );
                }
              },
              {
                label: 'GonsPool (Korea)',
                click: () => {
                  shell.openExternal(
                    'https://btn.gonspool.com/'
                  );
                }
              }
            ]
          },
          {
            label: 'Faucets',
            submenu: [
              {
                label: 'Bitcoin Nova Faucet (Official)',
                click: () => {
                  shell.openExternal(
                    'http://faucet.bitcoinnova.org/'
                  );
                }
              }
            ]
          },
          {
            label: 'Social',
            submenu: [
              {
                label: 'Facebook',
                click: () => {
                  shell.openExternal(
                    'https://www.facebook.com/bitcoinnova/'
                  );
                }
              },
              {
                label: 'Twitter',
                click: () => {
                  shell.openExternal(
                    'https://twitter.com/bitcoinnova'
                  );
                }
              },
              {
                label: 'Youtube',
                click: () => {
                  shell.openExternal(
                    'https://www.youtube.com/channel/UC7WeTDmqOLAlZAQdwSxtNSQ'
                  );
                }
              },
              {
                label: 'Telegram',
                click: () => {
                  shell.openExternal(
                    'https://t.me/joinchat/AJIApgu_sqZG8wrGoArrzw'
                  );
                }
              },
              {
                label: 'Discord',
                click: () => {
                  shell.openExternal(
                    'https://discord.gg/3XuP44z'
                  );
                }
              },
              {
                label: 'Kakao',
                click: () => {
                  shell.openExternal(
                    'https://open.kakao.com/o/gklnxDI'
                  );
                }
              },
              {
                label: 'Reddit',
                click: () => {
                  shell.openExternal(
                    'https://www.reddit.com/user/bitcoinnovaproject'
                  );
                }
              },
              {
                label: 'Medium',
                click: () => {
                  shell.openExternal(
                    'https://medium.com/@bitcoinnova'
                  );
                }
              },
              {
                label: 'Steemit',
                click: () => {
                  shell.openExternal(
                    'https://steemit.com/@bitcoinnova'
                  );
                }
              },
              {
                label: 'Github',
                click: () => {
                  shell.openExternal(
                    'https://github.com/BitcoinNova'
                  );
                }
              }
            ]
          }
        ]
      },
      {
        label: 'Donate',
        submenu: [
          {
            label: 'Donate to the Developers',
            click: () => {
              try {
                this.handleDonate();
              } catch (err) {
                log.error(err);
              }
            }
          }
        ]
      }
    ];

    return templateDefault;
  }
}
