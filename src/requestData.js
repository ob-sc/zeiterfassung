export default function requestData() {
  let result;
  $.get('../scripts/getdata.php', data => {
    result = JSON.parse(data);
    // stationNamen = result.stationNamen;
    // alleNamen = result.alleNamen;
    // ahDaten = result.ahDaten;
    // alleDaten = result.alleDaten;
    // maDaten = result.maDaten;
    // stationid = result.stationid;
    // station = result.station;
    // userStatus = result.status;
  });
  return result;
}
