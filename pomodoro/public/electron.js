// importing app and browser window from electron
const {app, BrowserWindow} = require('electron');

// specifies where the data we want to fetch is from (from react)
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Pomodoro',
        width: 400,
        hight: 430,
    });

    // connects to the react app
    const startUrl = url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true,
    });

    // loads the app in an electron window
    mainWindow.loadUrl(startUrl);
}

app.whenReady().then(createMainWindow)