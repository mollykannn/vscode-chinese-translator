const vscode = require("vscode");
const s2t = require("./tongwen/s2t-char.min.json");
const t2s = require("./tongwen/t2s-char.min.json");
const mapping = {
  s2t: new Map(Object.entries(s2t)),
  t2s: new Map(Object.entries(t2s)),
};
const translate = (action, text) => {
  return [...text]
    .map((element) => mapping[action].get(element) || element)
    .join("");
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let translateToSimplified = vscode.commands.registerCommand(
    "extension.translateToSimplified",
    function () {
      const editor = vscode.window.activeTextEditor;
      const allSelections = editor.selections;

      editor.edit((editBuilder) => {
        allSelections.forEach((selection) => {
          editBuilder.replace(
            selection,
            translate("t2s", editor.document.getText(selection))
          );
        });
      });
    }
  );

  context.subscriptions.push(translateToSimplified);

  let translateToTraditional = vscode.commands.registerCommand(
    "extension.translateToTraditional",
    function () {
      const editor = vscode.window.activeTextEditor;
      const allSelections = editor.selections;

      editor.edit((editBuilder) => {
        allSelections.forEach((selection) => {
          editBuilder.replace(
            selection,
            translate("s2t", editor.document.getText(selection))
          );
        });
      });
    }
  );

  context.subscriptions.push(translateToTraditional);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
