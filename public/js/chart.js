const createChart = (data) => {
      let dataArray = [
        ['時間（小時區間）', '車費 (元)']
      ]
      for (let i = 0; i < data.length; i++) {
        dataArray.push([
          data[i].HOUR.value.replace(':00:00', ''),
          data[i].TOTAL
        ]);
      }

      google.charts.load('current', { 'packages': ['bar'] });
      google.charts.setOnLoadCallback(drawCharts);
      function drawCharts() {
        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
          colors: ['#5cb85c'],
          chartArea: {
            left: 200,
            width: '100%',
            height: '100%'
          },
          legend: {
            position: 'none'
          }
        };
        var chart = new google.charts.Bar(document.getElementById('chart'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }
    }
