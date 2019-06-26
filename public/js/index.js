const search = () => {
  const year = document.getElementById("year").value;
  const month = document.getElementById("month").value;
  document.getElementsByClassName("title")[0].innerHTML = '';
  document.getElementsByClassName("title")[1].innerHTML = '';
  document.getElementsByClassName("subtitle")[0].innerHTML = '';
  document.getElementsByClassName("subtitle")[1].innerHTML = '';
  document.getElementById("statistics").innerHTML = '';
  document.getElementById("chart").innerHTML = '';
  document.getElementById("message").innerHTML = 'loading.....';
  fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ year, month })
  }).then((response) => {
    return response.json();
  }).then((data) => {
    if (!data.error) {
      document.getElementById("message").innerHTML = '';
      createTable(data);
      createChart(data);
      document.getElementsByClassName("title")[0].innerHTML = 'TABLE';
      document.getElementsByClassName("title")[1].innerHTML = 'CHART';
      document.getElementsByClassName("subtitle")[0].innerHTML = `${date} 中 24 個小時的平均車費、平均小費、小費／車費百分比、車次`;
      document.getElementsByClassName("subtitle")[1].innerHTML = `${date} 中 24 個小時的平均車費`;
    } else {
      document.getElementById("message").innerHTML = data.error;
    }
  }).catch((error) => {
    console.log(error);
  });
};

const yearSelect = (event) => {
  if (event.target.value === '2017') {
    document.getElementById('month').max = 8;
    document.getElementById('month').value = 1;
  } else new Promise(function(resolve, reject) {
    document.getElementById('month').max = 12;
  });
}
