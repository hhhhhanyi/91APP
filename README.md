# 91APP Assignment

Website: [https://bigquery.hhhhhanyi.com/](https://bigquery.hhhhhanyi.com/)

## Demo
![img](https://i.imgur.com/0tQJ0qv.png)


## Tech Stack
- BigQuery
- Node.js
- AWS EC2
- HTML / CSS / JavaScript
- Bootstrap
- Google Chart

## BigQuery
- 資料來源：bigquery-public-data.chicago_taxi\_trips
- 使用分區資料表：依據 TIMESTAMP 資料欄分區。

## 使用說明
### INPUT

|        | 格式             | 
| ------ | ----------      | 
| 日期   | YYYY-MM-DD | 

### OUTPUT
- TABLE

|       | 資料表相關欄位             | 說明                       | 
| ------ | -----------------------  | ------------------------- | 
| 時間    | trip_start\_timestamp   | 0 點到 23 點的 24 個小時區間 | 
| 車費    | trip_total              | 當小時的平均車費             | 
| 小費    | tips                    | 當小時的平均小費             | 
| 小費／車費百分比 | trip_total, tips | 當小時的小費／車費百分比      | 
| 車次    | 資料筆數                 | 當小時的車次                 | 

- CHART

|       | 資料表相關欄位             | 說明                       | 
| ------ | -----------------------  | ------------------------- | 
| 時間    | trip_start\_timestamp   | 0 點到 23 點的 24 個小時區間 | 
| 車費    | trip_total              | 當小時的平均車費             | 
