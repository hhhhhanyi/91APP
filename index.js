const express = require('express');
const app = express();
const bodyparser = require("body-parser");
const bigQuery = require('./util/bigquery');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/data', (req, res) => {
	/* bigQuery */
	if (req.body && req.body.year && req.body.month) {
		const year = req.body.year;
		const month = req.body.month;
		const check = checkDate(year, month);
		if (!check.error) {
			bigQuery(year, month).then((result) => {
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
			res.send(JSON.stringify(check));
		}
	} else {
		res.send(JSON.stringify({
			error: '未有資料輸入。'
		}));
	}
});

/* 檢查從前端傳入的資料 */
const checkDate = (year, month) => {
	let message = {
		error: '目前資料庫無該筆資料，請輸入 2013-01 至 2017-08 的任意月份。'
	};
	year = parseInt(year);
	month = parseInt(month);
	/* 檢查輸入格式 */
	if (isNaN(year) || isNaN(month)) {
		message = {
			error: '輸入日期格式錯誤，請以數字格式輸入。'
		};
		return message;
	}
	/* 檢查輸入日期範圍 */
	if (year === 2017 && month >= 1 && month <= 8) {
		delete message.error;
	} else if (year < 2017 && year >= 2013 && month >= 1 && month <= 12) {
		delete message.error;
	}
	return message;
}

app.use('/', express.static('public'));
app.listen(3000);
