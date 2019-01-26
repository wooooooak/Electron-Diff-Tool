const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const exec = require('child_process').exec;
require('./fileIpcInit');
require('./treeIpcInit');

let win;

ipcMain.on('compare', (event, arg) => {
	// exec(
	// 	`java -jar C:/Users/wooooooak/dev/dadada/dadada.jar "${arg[0]}" "${arg[1]}" "${arg[2]}"`,
	// 	{},
	// 	(error, stdout, stderr) => {
	// 		if (error) {
	// 			console.log(error);
	// 		}
	// 		console.log(stdout);
	// 		console.log(stderr);
	// 		event.sender.send('compare_response', { name: 'asdfadf' });
	// 	}
	// );
	setTimeout(() => {
		event.sender.send('compare_response', { name: 'asdfadf' });
	}, 1000);
});

function createWindow() {
	win = new BrowserWindow({ width: 1600, height: 1600 });

	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, '/../build/index.html'),
			protocol: 'file:',
			slashes: true
		});
	win.loadURL(startUrl);

	// Open the DevTools.
	win.webContents.openDevTools();

	// Emitted when the window is closed.
	win.on('closed', () => {
		win = null;
	});
}

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
