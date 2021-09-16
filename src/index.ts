import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';

import { requestAPI } from './handler';

import TestWidget from './TestWidget';

const activate = (app: JupyterFrontEnd, launcher: ILauncher) => {
  // blank widget
  const content = new TestWidget();
  const widget = new MainAreaWidget({ content });
  widget.id = 'multiqc-jupyterlab';
  widget.title.label = 'MultiQC extension';
  widget.title.closable = true;

  const command: string = 'multiqc:open';

  // add to launcher
  app.commands.addCommand(command, {
    label: 'MultiQC',
    caption: 'Run MultiQC',
    execute: () => {
      if (!widget.isAttached) {
        app.shell.add(widget, 'main');
      }
      app.shell.activateById(widget.id);
    },
  });

  launcher.add({ command, category: 'Test' });

  requestAPI<any>('get_example')
    .then(data => {
      console.log(data);
    })
    .catch(reason => {
      console.error(
        `The jupyterlab-multiqc server extension appears to be missing.\n${reason}`
      );
    });
}

/**
 * Initialization data for the jupyterlab-multiqc extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-multiqc:plugin',
  autoStart: true,
  requires: [ILauncher],
  activate: activate
};

export default plugin;
