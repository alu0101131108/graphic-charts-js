/**
 * @module PluginChartApp
 * @desc  Integrates a plugin which will make possible the graphic
 * visualization of data retrieved from a server.
 * @since 18/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */

'use strict';

import { DataRetriever } from './data-retriever.js';
import { GraphicView } from './graphic-view.js';
import { SearchBox } from './search-box.js';

class PluginChartApp {
  
  constructor() {
    this.dataRetriever = new DataRetriever('http://192.168.1.43//data-requests/serve.php');
    this.searchBox = new SearchBox(this.queryHandler.bind(this), 'Generar gráfica');
    this.plug();
  }

  plug() {
    const CONTAINER = document.body;
    /** To do: Find a good place to plug. */
    CONTAINER.appendChild(this.searchBox.getHtmlElement());
  }

  queryHandler(serialNumber) {
    this.dataRetriever.get(
      // Request parameters.
      {
        opcode: 1,
        sn: serialNumber
      },
      // Callback
      (result) => {
        if (!result) {
          this.searchBox.showError('Error en la búsqueda');
        }
        else if (result.length === 0) {
          this.searchBox.showError('SN desconocido');
        }
        else {
          this.loadGraphicView(serialNumber, result);
        }
      }
    );
  }

  loadGraphicView(serialNumber, data) {
    const PARENT = document.body;
    const BACKUP = PARENT.innerHTML;
    PARENT.innerHTML = '';

    const CONTAINER = document.createElement('div');
    /** To do: Set container/chart size, position, etc. */
    new GraphicView(CONTAINER, serialNumber, data);

    const BUTTON = document.createElement('button');
    BUTTON.textContent = 'Back to table';
    BUTTON.onclick = () => {
      PARENT.innerHTML = BACKUP;
    }

    PARENT.appendChild(CONTAINER);
    PARENT.appendChild(BUTTON);
  }

}

export {PluginChartApp};
