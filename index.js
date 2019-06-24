const express = require('express');
const app = express();
const bigQuery = require('./util/bigquery');

app.get('/data', (req, res) => {
	bigQuery('2014','09','24').then((result) => {
	  const [rows] = result;
	  res.send(rows);
	});
});

app.listen(3000);
