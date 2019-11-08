import requestData from './requestData';

const result2 = requestData();

$(document).ajaxComplete(() => {
  console.log(result2);
});
