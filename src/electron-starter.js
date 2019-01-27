const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');
const { remote, ipcRenderer } = require('electron');
require('./ipc/fileIpcInit');
require('./ipc/treeIpcInit');
require('./ipc/compareInit');

let win;

document.getElementById('menu-button').addEventListener('click', (event) => {
	ipcRenderer.send('display-app-menu', {
		x: event.x,
		y: event.y
	});
});

document.getElementById('minimize-button').addEventListener('click', () => {
	remote.getCurrentWindow().minimize();
});

document.getElementById('min-max-button').addEventListener('click', () => {
	const currentWindow = remote.getCurrentWindow();
	if (currentWindow.isMaximized()) {
		currentWindow.unmaximize();
	} else {
		currentWindow.maximize();
	}
});

document.getElementById('close-button').addEventListener('click', () => {
	remote.app.quit();
});

const createWindow = () => {
	win = new BrowserWindow({
		width: 1000,
		height: 800,
		titleBarStyle: 'hiddenInset',
		acceptFirstMouse: true,
		title: 'SHOW DIFF!'
	});

	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, '/../build/index.html'),
			protocol: 'file:',
			slashes: true
		});
	win.loadURL(startUrl);

	// Open the DevTools.
	// win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	});
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (win === null) {
		createWindow();
	}
});
