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
        // titleBarStyle: 'hidden',
        // webPreferences: {
        //     preload: path.join(__dirname, "preload.js"),
        //     contextIsolation: true,
        //     nodeIntegration: false,
        // }
    });

    // connects to the react app
    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    // loads the app in an electron window
    mainWindow.loadURL(startUrl);
};

app.whenReady().then(createMainWindow);