import './jquery.min.js';

function loadTableData() {
  ajaxGetData({ opcode: 0 }, '#master-table');
  ajaxGetData({ opcode: 1, sn: 'GPON00F42038'}, '#onu1-table');
  ajaxGetData({ opcode: 1, sn: 'ZTEGC9744A32'}, '#onu2-table');
}

function ajaxGetData(dataObject, tableHtmlId) {
  jQuery.ajax({
    // url: 'http://192.168.1.43//data-requests/serve.php',
    url: 'http://127.0.0.1//data-requests/serve.php',
    type: 'get',
    data: dataObject,
    dataType: 'JSON',
    success: (response) => {
      for (let row of response) {
        const HEADERS = Object.keys(row);
        let tableRowHtml = '<tr>';
        for (let header of HEADERS) {
          tableRowHtml += "<td align='center'>" + row[header] + "</td>";
        }
        tableRowHtml += '</tr>';
        jQuery(tableHtmlId + ' tbody').append(tableRowHtml);
      }
    }
  });
}

window.loadTableData = loadTableData;