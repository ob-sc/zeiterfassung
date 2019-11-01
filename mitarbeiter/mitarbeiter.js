/* global fehler */
let maDaten = [];

$.get('../scripts/getdata.php', data => {
  const result = JSON.parse(data);
  maDaten = result.maDaten;
});

$(document).ajaxComplete(() => {
  let maRow;
  maDaten.forEach(key => {
    if (key.status === 'neu') {
      maRow += `<tr class="table-danger"><td>${key.username}</td>`;
      maRow += `<td>${key.status}</td>`;
      maRow += `<th><img src="../img/confirm.svg" width="18" class="confirm" id="${key.id}"></th></tr>`;
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
