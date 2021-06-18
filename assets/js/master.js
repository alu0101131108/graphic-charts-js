/**
 * @desc  Requests data via AJAX from a php server in order to
 * show it inside tables.
 * @since 11/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

import { DataRetriever } from './plugin-files/data-retriever.js';

window.onload = () => {
  const DATA_RETRIEVER = new DataRetriever('http://192.168.1.43//data-requests/serve.php');
  DATA_RETRIEVER.get({ opcode: 0 }, fillTable('#master-table'));
  DATA_RETRIEVER.get({ opcode: 1, sn: 'GPON00F42038' }, fillTable('#onu1-table'));
  DATA_RETRIEVER.get({ opcode: 1, sn: 'ZTEGC9744A32' }, fillTable('#onu2-table'));
}

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
