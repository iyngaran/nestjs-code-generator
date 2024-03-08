import * as vscode from 'vscode';
import { workspace, commands, ExtensionContext, window, Uri } from 'vscode';
import { invalidFileNames } from './utils';
import { createFile } from './file-helper';

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "nestjs-code-generator" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    'nestjs-code-generator.generateService',
    (resource: Uri) => {
      if (workspace === undefined) {
        return window.showErrorMessage('Please select a workspace first');
      } else {
        window
          .showInputBox({
            placeHolder: 'Please enter Service name'
          })
          .then<any>((input) => {
            if (input === undefined) {
              return;
            }
            if (!invalidFileNames.test(input)) {
              return createFile({
                name: input,
                type: 'service',
                associatedArray: 'providers',
                uri: resource,
                fullName: input.toLowerCase() + `.service.ts`
              });
            } else {
              return window.showErrorMessage('Invalid filename');
            }
          });
      }

      vscode.window.showInformationMessage(
        'Wait... we will generate service from NestJs Code Generator soon!'
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
