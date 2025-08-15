// importing app and browser window from electron
const {app, BrowserWindow} = require('electron');
const {ipcMain} = require("electron");

// specifies where the data we want to fetch is from (from react)
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Pomodoro',
        width: 400,
        height: 400,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),    // path to preload script
            contextIsolation: true, // keeps context isolated for security
            nodeIntegration: false  // disables node.js in the renderer
        }
    });

    // connects to the react app
    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    // loads the app in an electron window
    mainWindow.loadURL(startUrl);

    // listen for the clsoe app button click
    ipcMain.on('close-app', () => {
        app.quit();
    });
};

app.whenReady().then(createMainWindow);