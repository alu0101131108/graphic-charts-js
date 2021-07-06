/**
 * @module GraphicData
 * @desc  This class will make use of Chart.js to draw a chart
 * inside a given html container.
 * @since 17/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

import './chart.min.js';

class GraphicView {
  /**
   * Main canvas is created and attached to the given container.
   * Then data is processed and outputted as a chart.
   * @param {HTMLElement} container Parent HTML Container.
   * @param {String} serialNumber Target id.
   * @param {Object} data JSON Data.
   */
  constructor(container, serialNumber, data) {
    this.serialNumber = serialNumber;
    this.data = this.processJson(data);
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'chart-canvas';
    container.appendChild(this.canvas);
    this.chart();
  }

  /**
   * Process JSON Data and transforms it, so its easier
   * to manipulate when creating the chart.
   * @param {Object} jsonData 
   */
  processJson(jsonData) {
    const OLT_RXS = [];
    const ONU_RXS = [];
    const HORAS = [];
    for (let row of jsonData) {
      OLT_RXS.push(parseFloat(row['OLT_RX']));
      ONU_RXS.push(parseFloat(row['ONU_RX']));
      HORAS.push(new Date(row['HORA']));
    }
    const DATA = {
      OLT_RX: OLT_RXS,
      ONU_RX: ONU_RXS,
      HORA: HORAS
    };
    return DATA;
  }

  /**
   * Sets configuration and draws the chart. 
   */
  chart() {
    new Chart(this.canvas, {
      type: 'line',
      data: {
        labels: this.data['HORA'].map((elem) => { 
          return elem.toLocaleTimeString(); 
        }),
        datasets: [{ 
            data: this.data['OLT_RX'],
            label: 'OLT_RX',
            borderColor: '#3e95cd',
            fill: false
          }, { 
            data: this.data['ONU_RX'],
            label: 'ONU_RX',
            borderColor: '#8e5ea2',
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Device Data Chart'
        }
      }
    });
  }
}

export {GraphicView};