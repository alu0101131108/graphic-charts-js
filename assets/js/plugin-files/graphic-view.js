/**
 * @module GraphicData
 * @desc  Integrates a plugin which will make possible the graphic
 * visualization of data.
 * @since 17/06/2021
 * @author Sebastián Daniel Tamayo Guzmán
 */
'use strict';

import './chart.min.js';

class GraphicView {

  constructor(container, serialNumber, data) {
    this.serialNumber = serialNumber;
    this.data = this.processJson(data);
    this.canvas = document.createElement('canvas');
    container.appendChild(this.canvas);
    this.chart();
  }

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