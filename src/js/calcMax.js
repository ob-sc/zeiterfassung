// calculate max for month and year
// dependencies:
// ajax: data.ahid
// monthcell und yearcell
// moment end & start

/*
const calcMax = statusMax => {
  const today = moment().format('DD');

  const regDate = moment(alleDaten[data.name].reg_date, 'YYYY-MM-DD HH:mm:ss');

  // create first day by taking the current year
  let firstDayYear = `${moment().format('YYYY')}-12-18`;

  // if firstDayYear is in the future subtract 1 year
  if (moment().isBefore(moment(firstDayYear, 'YYYY-MM-DD'))) {
    firstDayYear = `${moment()
      .subtract(1, 'years')
      .format('YYYY')}-12-18`;
  }

  // first day of abrechnungs-month (?) - don't create it yet
  let firstDayMonth = '';

  // if today is after the 17th, currently in the next month
  if (today > 17) {
    firstDayMonth = `${moment().format('YYYY-MM')}-18`;
  }

  // if today is before the 18th, currently in the right month
  if (today < 18) {
    firstDayMonth = `${moment()
      .subtract(1, 'months')
      .format('YYYY-MM')}-18`;
  }

  // wenn tag kleiner ist als 18, der monat also im abrechnungszeitraumsmonat ist und der monat januar ist
  if (today < 18 && moment().format('MM') === '01') {
    firstDayMonth = firstDayYear;
  }

  // calc months currently worked
  const monthStart = moment(firstDayYear, 'YYYY-MM-DD');
  let months = 1;

  // loop through all billing months for this year until now
  while (monthStart.isBefore(moment())) {
    // this is always one month less, added that 1 month in the variable declaration for months
    if (!monthStart.isBefore(regDate) && !monthStart.isSame(regDate, 'day')) {
      months += 1;
    }

    monthStart.add(1, 'months');
  }

  const maxYear = statusMax * months;

  $.ajax({
    url: '../api/gehaltMax.php',
    method: 'POST',
    data: {
      ahid: data.ahid,
      status: alleDaten[data.name].ahStatus,
      firstDayMonth,
      firstDayYear
    }
  })
    .done(maxData => {
      const res = JSON.parse(maxData);

      const month = Number(res.month) + Number(sendData.gehalt);
      const year = Number(res.year) + Number(sendData.gehalt);

      const mMax = statusMax - month;
      const yMax = maxYear - year;

      if (notdienst || moments.end.isAfter(moments.start)) {
        document.getElementById('monthCell').innerHTML = `${roundTF(mMax)}€`;
        document.getElementById('yearCell').innerHTML = `${roundTF(yMax)}€`;
        if (yMax >= 0) confirmBtn.style.display = 'block';
      } else {
        document.getElementById('monthCell').innerHTML = '';
        document.getElementById('yearCell').innerHTML = '';
        confirmBtn.style.display = 'none';
      }
    })
    .fail(maxData => {
      return fehler(maxData.responseText);
    });
};

export default calcMax;

*/
