const { ipcMain } = require('electron');
const exec = require('child_process').exec;

const compareEvent = () =>
	ipcMain.on('compare', (event, arg) => {
		exec(
			`java -jar C:/Users/wooooooak/dev/dadada/dadada.jar "${arg[0]}" "${arg[1]}" "${arg[2]}"`,
			{},
			(error, stdout, stderr) => {
				if (error) {
					console.log(error);
				}
				console.log(stdout);
				console.log(stderr);
				event.sender.send('compare_response');
			}
		);
	});

const init = () => {
	compareEvent();
};

init();
