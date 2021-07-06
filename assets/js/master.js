/**
 * @desc  Requests data via AJAX from a php server in order to
 * show it inside tables.
 * @since 11/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

import { DataRetriever } from './plugin-files/data-retriever.js';

/**
 * Retrieve and fill each three data tables.
 */
window.onload = () => {
  const URL = 'http://192.168.1.43//data-requests/serve.php';
  // const URL = 'http://localhost//data-requests/serve.php';
  const DATA_RETRIEVER = new DataRetriever(URL);
  DATA_RETRIEVER.get(
    { opcode: 0 }, 
    fillTable('#master-table')
  );
  DATA_RETRIEVER.get(
    { opcode: 1, sn: 'GPON00F42038' }, 
    fillTable('#onu1-table')
  );
  DATA_RETRIEVER.get(
    { opcode: 1, sn: 'ZTEGC9744A32' }, 
    fillTable('#onu2-table')
  );
}

/**
 * Works as a handler to the data requests made. It fills
 * html tables with values recieved by request.
 * @param {String} tableId Html ID
 */
function fillTable(tableId) {
  return (response) => {
    const HEADERS = Object.keys(response[0]);
    const TABLE_BODY = document.querySelector(tableId + ' tbody');
    for (let row of response) {
      const ROW = document.createElement('tr');
      for (let header of HEADERS) {
        const CELL = document.createElement('td');
        const CONTENT = row[header] ? row[header] : 'N/A';
        CELL.textContent = CONTENT;
        ROW.appendChild(CELL);
      }
      TABLE_BODY.appendChild(ROW);
    }
  }
}
