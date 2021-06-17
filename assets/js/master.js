/**
 * @author Sebastián Daniel Tamayo Guzmán
 * @since 11/06/2021
 * @desc  Requests data via AJAX from a php server in order to
 *        show it inside tables.
 */
'use strict';

import './lib/jquery.min.js';
import {GraphicView} from './graphic-view.js';

/**
 * Retrieves data for the main table and for two specific tables.
 */
function loadTableData() {
  requestTableData({ opcode: 0 }, '#master-table');
  requestTableData({ opcode: 1, sn: 'GPON00F42038'}, '#onu1-table');
  requestTableData({ opcode: 1, sn: 'ZTEGC9744A32'}, '#onu2-table');
}

/**
 * Makes a GET request via AJAX to the php server.
 * @param {Object} dataObject Specifies which data wants to retrieve.
 * @param {String} tableHtmlId Table where data will be stored.
 */
function requestTableData(dataObject, tableHtmlId) {
  jQuery.ajax({
    url: 'http://192.168.1.43//data-requests/serve.php',
    // url: 'http://127.0.0.1//data-requests/serve.php',
    type: 'get',
    data: dataObject,
    dataType: 'JSON',
    success: (response) => {
      const HEADERS = Object.keys(response[0]);
      const TABLE_BODY = document.querySelector(tableHtmlId + ' tbody');
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
  });
}

function tableClickEvents() {
  const MASTER_TABLE = document.querySelector('#master-table');
  const ROWS = MASTER_TABLE.tBodies[0].rows;
  for (let i = 0; i < ROWS.length; i++) {
    const SN = ROWS[i].cells[4].textContent;
    ROWS[i].addEventListener('click', clickHandler(SN));
  }
}

const clickHandler = (sn) => {
  return () => {
    new GraphicView(document.body, sn);
  }
}

window.tableClickEvents = tableClickEvents;

window.onload = () => {
  loadTableData();
  setTimeout(tableClickEvents, 500);
}








/**
  * Vanilla JS version of GET Request.
function requestTableData(dataObject, tableHtmlId) {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://192.168.1.43//data-requests/serve.php' + '?sn=' + dataObject['sn'] + '&opcode=' + dataObject['opcode']);
  xhr.send();

  xhr.onreadystatechange = function () {
    var DONE = 4; // readyState 4 means the request is done.
    var OK = 200; // status 200 is a successful return.
    if (xhr.readyState === DONE) {
      if (xhr.status === OK) {
        const response = JSON.parse(xhr.responseText)
        const HEADERS = Object.keys(response[0]);
        const TABLE_BODY = document.querySelector(tableHtmlId + ' tbody');
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
      } else {
        console.log('Error: ' + xhr.status); // An error occurred during the request.
      }
    }
  };
}
 */