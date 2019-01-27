const { ipcMain } = require('electron');
const dirTree = require('directory-tree');

const getTreeEvent = () => {
	ipcMain.on(`tree/mod`, (event, arg) => {
		event.returnValue = dirTree(
			`C:/Users/wooooooak/dev/dadada/Result/${arg}/MOD_FILE`
		);
	});
	ipcMain.on(`tree/add`, (event, arg) => {
		event.returnValue = dirTree(
			`C:/Users/wooooooak/dev/dadada/Result/${arg}/ADD_FILE`
		);
	});
	ipcMain.on(`tree/del`, (event, arg) => {
		event.returnValue = dirTree(
			`C:/Users/wooooooak/dev/dadada/Result/${arg}/DEL_FILE`
		);
	});
};

const init = () => {
	getTreeEvent();
};

init();
