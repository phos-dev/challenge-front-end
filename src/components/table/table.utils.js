export const compare = (a, b) => {
  if (a > b) {
      return 1;
  }
  else if (a < b) {
      return -1;
  }
  return 0;
}

export const formatDate = date => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [day, month, year].join('/');
}