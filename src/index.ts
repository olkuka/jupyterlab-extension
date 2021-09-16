import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { requestAPI } from './handler';

/**
 * Initialization data for the jupyterlab-multiqc extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-multiqc:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyterlab-multiqc is activated!');

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
};

export default plugin;
