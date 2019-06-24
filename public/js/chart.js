const createChart = (data) => {
  let dataSet = [];
  for (let i=0; i<data.length; i++) {
    dataSet.push(data[i].TOTAL);
  }
  const width = 1000;
  const height = 250;
  const padding = {
    top: 0,
    right: 20,
    bottom: 20,
    left: 20
  };
  const graphicHeight = height - padding.top - padding.bottom;
  const rectStep = 40;
  const rectWidth = 35;
  const maxValue = Math.max(...dataSet);
  const svg = d3.select("#chart")
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 1000 250")
    .attr("width", width)
    .attr("height", height);

  const rect = svg.selectAll("rect")
    .data(dataSet)
    .enter()
    .append("rect")
    .attr("fill", "#5cb85c")
    .attr("x", (d,i) => {
      return padding.left + i * rectStep;
    })
    .attr("y", (d) => {
      return height - padding.bottom - graphicHeight * (d / maxValue);
    })
    .attr("width", rectWidth)
    .attr("height", (d) => {
      return graphicHeight * (d / maxValue);
    });
};
