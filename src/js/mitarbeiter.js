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
      maRow += `<th class="text-center"><img src="../img/check-square-regular.svg" width="18" class="confirm" data-confirmid="${key.id}"></th>`;
      maRow += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deleteid="${key.id}"></th></tr>`;
    } else {
      maRow += `<tr><td>${key.username}</td>`;
      maRow += '<td>Bestätigt</td>';
      maRow += '<td>&nbsp</td>';
      maRow += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deleteid="${key.id}"></th></tr>`;
    }
  });
  $('#maTab').html(maRow);

  // eslint-disable-next-line func-names
  $('.confirm').click(function() {
    const maid = $(this).data('confirmid');

    $.ajax({
      url: 'maedit.php',
      method: 'POST',
      data: { id: maid }
    })
      .done(() => {
        window.location.reload();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });

  // eslint-disable-next-line func-names
  $('.delete').click(function() {
    const deleteid = $(this).data('deleteid');

    $.ajax({
      url: 'madelete.php',
      method: 'POST',
      data: { id: deleteid }
    })
      .done(() => {
        window.location.reload();
      })
      .fail(data => {
        fehler(data.responseText);
      });
  });
});
