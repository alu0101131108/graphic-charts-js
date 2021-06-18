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
  
  /**
   * Sets the data retriever and the search box.
   */
  constructor() {
    this.dataRetriever = new DataRetriever('http://192.168.1.43//data-requests/serve.php');
    this.searchBox = new SearchBox(this.queryHandler.bind(this), 'Generar gráfica');
    this.plug();
  }

  /**
   * Decides where the SearchBox will be contained.
   */
  plug() {
    const CONTAINER = document.body;
    /** To do: Find a good place to plug. */
    CONTAINER.appendChild(this.searchBox.getHtmlElement());
  }

  /**
   * Works as a handler for the search box button. It makes the request
   * and if its succesfull loads the graphic view.
   * @param {String} serialNumber 
   */
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

  /**
   * Clears the current page and loads the graphic view on it.
   * Also sets a back button to return.
   * @param {String} serialNumber 
   * @param {Object} data Processed data.
   */
  loadGraphicView(serialNumber, data) {
    /** To do: Find the right parent to insert the chart. */
    const PARENT = document.body;
    const BACKUP = PARENT.innerHTML;
    PARENT.innerHTML = '';

    const CONTAINER = document.createElement('div');
    CONTAINER.style.width = '90%';
    CONTAINER.style.height = '90%';
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
