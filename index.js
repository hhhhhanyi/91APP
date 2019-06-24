const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const bigQuery = require('./util/bigquery');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/data', (req, res) => {
	let date = req.body.date;
	/* 檢查輸入格式 */
	if (date && date.split('-').length === 3) {
		/* 檢查輸入日期範圍 */
		if (date > 1356969600000 && date < 1501516800000) {
			date = date.split('-');
			const year = date[0];
			const month = date[1];
			const day = date[2];
			bigQuery(year, month, day).then((result) => {
			  const [data] = result;
				/* 檢查是否有資料內容 */
				if (data.length > 0) {
					res.send(JSON.stringify(data));
				} else {
					res.send(JSON.stringify({
						error: 'No Data.'
					}));
				}
			});
		} else {
			res.send(JSON.stringify({
				error: 'Wrong Date.'
			}));
		}
	} else {
		res.send(JSON.stringify({
			error: 'Wrong Format.'
		}));
	}
});

app.use('/', express.static('public'));
app.listen(3000);
