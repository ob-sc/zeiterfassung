const calendar = (date = new Date()) => {
  // month = 0-indexed
  // format: yyyy-MM-dd (date-fns)
  // ab = abrechnung

  const addZero = (num) => (num < 10 ? `0${num}` : String(num));

  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();

  const isNextABmonth = d > 17;
  const isDecember = m === 11;
  const isYearBehind = isNextABmonth && isDecember;

  let mnum = m;
  if (isNextABmonth) mnum = isDecember ? 0 : mnum + 1;

  const month = {
    num: mnum,
  };

  const year = {
    num: isYearBehind ? y + 1 : y,
  };

  if (isYearBehind) {
    month.start = { str: `${y}-12-18`, date: new Date(y, 11, 18) };
    month.end = { str: `${year.num}-01-17`, date: new Date(year.num, 0, 17) };
  } else {
    const isJanuary = month.num === 0;
    const monthNum = isJanuary ? 12 : month.num;
    month.start = {
      str: `${isJanuary ? year.num - 1 : year.num}-${addZero(monthNum)}-18`,
      date: new Date(isJanuary ? year.num - 1 : year.num, monthNum - 1, 18),
    };
    month.end = {
      str: `${year.num}-${addZero(month.num + 1)}-17`,
      date: new Date(year.num, month.num, 17),
    };
  }

  year.start = {
    str: `${year.num - 1}-12-18`,
    date: new Date(year.num - 1, 11, 18),
  };
  year.end = { str: `${year.num}-12-17`, date: new Date(year.num, 11, 17) };

  return { month, year };
};

export default calendar;
