import './jquery.min.js';

function requestOnuData() {
  jQuery.ajax({
    url: 'http://192.168.1.43//requestHandlers/onuReqHandle.php',
    type: 'get',
    dataType: 'JSON',
    success: (response) => {
      let len = response.length;
      for (let i = 0; i < len; i++) {
        let sn = response[i].sn;
        let olt_rx = response[i].olt_rx;
        let onu_rx = response[i].onu_rx;
        let hora = response[i].hora;

        let tr_str = "<tr>" +
          "<td align='center'>" + sn + "</td>" +
          "<td align='center'>" + olt_rx + "</td>" +
          "<td align='center'>" + onu_rx + "</td>" +
          "<td align='center'>" + hora + "</td>" +
          "</tr>";

        jQuery("#onuTable tbody").append(tr_str);
      }
    }
  });
}

window.requestOnuData = requestOnuData;