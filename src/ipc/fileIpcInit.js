const { ipcMain } = require('electron');
const fs = require('fs');

const getSummaryEvent = () => {
	ipcMain.on('file/summary', (event, arg) => {
		const summary = require(`C:/Users/wooooooak/dev/dadada/Result/${arg}/output_summary/v1_v2_summary.json`);
		event.returnValue = summary;
	});
};

const getDiffFile = () => {
	ipcMain.on(`file/diff`, (event, path) => {
		const array = fs.readFileSync(path).toString().split('\n');
		const jsonArray = array.map((str) => {
			const v1Line = str.slice(0, 9);
			const v2Line = str.slice(10, 18);
			const symbol = str.slice(19, 20);
			const string = str.slice(20);
			return {
				v1Line,
				v2Line,
				symbol,
				string
			};
		});
		event.returnValue = { content: jsonArray };
	});
};

const getOriginFile = () => {
	ipcMain.on(`file/origin`, (event, path) => {
		const array = fs.readFileSync(path).toString().split('\n');
		const jsonArray = array.map((str) => {
			const v1Line = str.slice(0, 9);
			const symbol = str.slice(10, 11);
			const string = str.slice(11);
			const v2Line = '';
			return {
				v1Line,
				v2Line,
				symbol,
				string
			};
		});
		event.returnValue = { content: jsonArray };
	});
};

const init = () => {
	getSummaryEvent();
	getDiffFile();
	getOriginFile();
};

init();
