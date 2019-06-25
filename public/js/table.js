const createRow = (id) => {
  let row = document.createElement('tr');
  row.setAttribute('id', `${id}`);
  document.getElementById('statistics').appendChild(row);
};

const createColumns = (id, content) => {
  let column = document.createElement('td');
  let text = document.createTextNode(content);
  column.appendChild(text);
  document.getElementById(`${id}`).appendChild(column);
};

const createTable = (data) => {
  createRow('HOUR');
  createColumns('HOUR', '時間 (小時區間)');
  for (let j=0; j<data.length; j++) {
    createColumns('HOUR', data[j].HOUR.value.replace(':00:00',''));
  }

  createRow('TOTAL');
  createColumns('TOTAL', '平均車費 (元)');
  for (let j=0; j<data.length; j++) {
    let num = Math.round(data[j].TOTAL*100)/100;
    createColumns('TOTAL', num);
  }

  createRow('TIPS');
  createColumns('TIPS', '平均小費 (元)');
  for (let j=0; j<data.length; j++) {
    let num = Math.round(data[j].TIPS*100)/100;
    createColumns('TIPS', num);
  }

  createRow('PERCENT');
  createColumns('PERCENT', '小費/車費 (%)');
  for (let j=0; j<data.length; j++) {
    let num = Math.round(data[j].TIPS/data[j].TOTAL*10000)/100;
    createColumns('PERCENT', num);
  }

  createRow('COUNT');
  createColumns('COUNT', '車次 (次)');
  for (let j=0; j<data.length; j++) {
    let num = Math.round(data[j].COUNT*100)/100;
    createColumns('COUNT', num);
  }
};
