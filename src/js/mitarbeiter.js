import { getData, fehler } from './funktionen';

$(document).ready(() => {
  $('nav li').removeClass('current');
  $('#mitarbeiter').addClass('current');

  getData(daten => {
    const { maDaten } = daten;
    let maRow;
    maDaten.forEach(key => {
      if (key.status === 'neu') {
        maRow += `<tr class="table-danger"><td>${key.username}</td>`;
        maRow += '<td class="text-center">Neu</td>';
        maRow += `<th class="text-center"><img src="../img/check-square-regular.svg" width="18" class="confirm" data-confirmid="${key.id}"></th>`;
        maRow += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deleteid="${key.id}"></th></tr>`;
      } else {
        maRow += `<tr><td>${key.username}</td>`;
        maRow += '<td class="text-center">Bestätigt</td>';
        maRow += '<td>&nbsp</td>';
        maRow += `<th class="text-center"><img src="../img/trash-alt-regular.svg" width="18" class="delete" data-deleteid="${key.id}"></th></tr>`;
      }
    });
    $('#maTab').html(maRow);

    // eslint-disable-next-line func-names
    $('.confirm').click(function() {
      const maid = $(this).data('confirmid');

      $.ajax({
        url: '../shitapi/maedit.php',
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
        url: '../shitapi/madelete.php',
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
});
