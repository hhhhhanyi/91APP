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
		if (+new Date(date) >= 1356969600000 && +new Date(date) <= 1501545600000) {
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
						error: '目前資料庫無該筆資料，請更換其他日期查詢。'
					}));
				}
			});
		} else {
			res.send(JSON.stringify({
				error: '目前資料庫無該筆資料，請輸入 2013-01-01 至 2017-08-01 的任意日期。'
			}));
		}
	} else {
		res.send(JSON.stringify({
			error: '輸入日期格式錯誤，請以 YYYY-MM-DD 格式輸入。'
		}));
	}
});

app.use('/', express.static('public'));
app.listen(3000);
