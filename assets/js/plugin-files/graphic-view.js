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

  constructor(root, sn) {
  
    this.root = root;
    this.backup = this.root.innerHTML;
    this.root.innerHTML = '';
    this.canvas = document.createElement('canvas');
    this.requestData(sn);
    this.root.appendChild(this.canvas);

    
    const BUTTON = document.createElement('button');
    BUTTON.textContent = 'Back to table';
    BUTTON.onclick = () => {
      this.root.innerHTML = this.backup;
      tableClickEvents();
    }
    this.root.appendChild(BUTTON);
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
        const OLT_RXS = [];
        const ONU_RXS = [];
        const HORAS = [];
        for (let row of response) {
          OLT_RXS.push(parseFloat(row['OLT_RX']));
          ONU_RXS.push(parseFloat(row['ONU_RX']));
          HORAS.push(new Date(row['HORA']));
        }
        const DATA = {
          OLT_RX: OLT_RXS,
          ONU_RX: ONU_RXS,
          HORA: HORAS
        };
        this.setCharts(DATA);
      }
    });
  }

  setCharts(data) {
    new Chart(this.canvas, {
      type: 'line',
      data: {
        labels: data['HORA'].map((elem) => { 
          return elem.toLocaleTimeString(); 
        }),
        datasets: [{ 
            data: data['OLT_RX'],
            label: 'OLT_RX',
            borderColor: '#3e95cd',
            fill: false
          }, { 
            data: data['ONU_RX'],
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