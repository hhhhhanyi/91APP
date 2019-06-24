const search = () => {
  const date = document.getElementById("date").value;
  fetch('/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ date: date })
  }).then((response) => {
    return response.json();
  }).then((data) => {
    if (!data.error) {
      document.getElementById("demo").innerHTML = data[0].TOTAL;
    } else {
      document.getElementById("errorMessage").innerHTML = data.error;
    }
  }).catch((error) => {
    console.log(error);
  });
};
