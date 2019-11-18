import { fehler } from './funktionen';
import dataJSON from './request';

let maDaten;

$(document).ajaxComplete(() => {
  maDaten = dataJSON.responseJSON.maDaten;
});

$(document).ajaxComplete(() => {
  let maRow;
  maDaten.forEach(key => {
    if (key.status === 'neu') {
      maRow += `<tr class="table-danger"><td>${key.username}</td>`;
      maRow += '<td>Neu</td>';
      maRow += `<th><img src="../img/check-square-regular.svg" width="18" class="confirm" id="${key.id}"></th></tr>`;
    } else {
      maRow += `<tr><td>${key.username}</td>`;
      maRow += '<td>Bestätigt</td>';
      maRow += '<td>&nbsp</td></tr>';
    }
  });
  $('#maTab').html(maRow);

  $('.confirm').click(e => {
    const maid = e.currentTarget.getAttribute('id');
    $.ajax({
      url: 'maedit.php',
      method: 'POST',
      data: { maid }
    })
      .done(() => {
        window.location.reload();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});
