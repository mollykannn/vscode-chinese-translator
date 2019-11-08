const vscode = require('vscode');
const tongwenSt = require('./tongwen/tongwen-st.js');
const tongwenTs = require('./tongwen/tongwen-ts.js');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let translateToSimplified = vscode.commands.registerCommand('extension.translateToSimplified', function () {
		const editor = vscode.window.activeTextEditor
		const allSelections = editor.selections

		editor.edit(editBuilder => {
			allSelections.forEach(selection => {
				const text = editor.document.getText(selection)
				editBuilder.replace(selection, tongwenTs(text))
			})
		})
	});

	context.subscriptions.push(translateToSimplified);

	let translateToTraditional = vscode.commands.registerCommand('extension.translateToTraditional', function () {
		const editor = vscode.window.activeTextEditor
		const allSelections = editor.selections

		editor.edit(editBuilder => {
			allSelections.forEach(selection => {
				const text = editor.document.getText(selection)
				editBuilder.replace(selection, tongwenSt(text))
			})
		})
	});

	context.subscriptions.push(translateToTraditional);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
