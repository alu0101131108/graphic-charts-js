/**
 * @author Sebastián Daniel Tamayo Guzmán
 * @since 11/06/2021
 * @desc  Requests data via AJAX from a php server in order to
 *        show it inside tables.
 * @module GraphicData
 */
'use strict';

import './lib/chart.min.js';

class GraphicView {

  constructor(root, sn) {
    this.root = root;
    this.backup = this.root.innerHTML;
    this.root.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 450;
    this.requestData(sn);
    this.root.appendChild(this.canvas);
    setTimeout(() => {
      this.root.innerHTML = this.backup;
      tableClickEvents();
    }, 5000);
  }

  requestData(target) {
    jQuery.ajax({
      url: 'http://192.168.1.43//data-requests/serve.php',
      // url: 'http://127.0.0.1//data-requests/serve.php',
      type: 'get',
      data: {
        opcode: 1,
        sn: target
      },
      dataType: 'JSON',
      success: (response) => {
        const OLT_RX = [];
        const ONU_RX = [];
        const HORA = [];
        for (let row of response) {
          OLT_RX.push(row['OLT_RX']);
          ONU_RX.push(row['ONU_RX']);
          HORA.push(row['HORA']);
        }
        this.setCharts([OLT_RX, ONU_RX, HORA]);
      }
    });
  }

  setCharts(data) {
    console.log(data);
    new Chart(this.canvas, {
      type: 'line',
      data: {
        labels: [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050],
        datasets: [{ 
            data: [86,114,106,106,107,111,133,221,783,2478],
            label: "Africa",
            borderColor: "#3e95cd",
            fill: false
          }, { 
            data: [282,350,411,502,635,809,947,1402,3700,5267],
            label: "Asia",
            borderColor: "#8e5ea2",
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'World population per region (in millions)'
        }
      }
    });
  }
}

export {GraphicView};