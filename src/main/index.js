import {app, BrowserWindow, Menu, MenuItem} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`;

function createWindow() {
    /**
     * Initial window options
     */
    let appMenuTem = [
        {
            label:"文件",
            type:"submenu",
            submenu:[
                {label: "新建"},
                {label: "打开"},
                {label: "关闭项目"},
                {label: "-",type:"separator"},
                {label: "最小化" ,role:"minimize"},
                {label: "退出" ,role:"quit"},
            ]
        },
        {
            label:"编辑",
            type:"submenu",
            submenu:[
                {label: "撤销",role:"undo"},
                {label: "重复",role:"redo"},
                {label: "-",type:"separator"},
                {label: "剪切",role:"cut"},
                {label: "复制",role:"copy"},
                {label: "粘贴",role:"paste"}
            ]
        },
        {
            label:"帮助",
            type:"submenu",
            submenu:[
                {label: "BlockCreator 帮助文档"},
                {label: "积木库文档"},
                {label: "-",type:"separator"},
                {label: "关于",role:"about"}
            ]
        }
    ];
    const menu = Menu.buildFromTemplate(appMenuTem);
    Menu.setApplicationMenu(menu);
    mainWindow = new BrowserWindow({
        height: 768,
        useContentSize: true,
        width: 1024,
        title: "BlockCreator",
        webPreferences: {
            nodeIntegration: true,
            webviewTag:true
        },

    })

    mainWindow.loadURL(winURL);

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
