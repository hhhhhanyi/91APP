const {BigQuery} = require('@google-cloud/bigquery');
const constants = require('./constants');

const bigQuery = (year, month, day) => {
  const bigquery = new BigQuery({
    projectId: constants.projectId,
    keyFilename: './util/bigquerykey.json'
  });

  const query = `SELECT
    TIME_TRUNC(TIME(trip_start_timestamp), HOUR) AS HOUR,
    AVG(trip_total) AS TOTAL,
    AVG(tips) AS TIPS,
    COUNT(*) AS COUNT
    FROM \`${constants.projectId}.${constants.dataset}.${constants.table}\`
    WHERE DATE_TRUNC(DATE(trip_start_timestamp), month) = @date
    GROUP BY HOUR ORDER BY HOUR`;

  const options = {
    query: query,
    location: constants.location,
    params: {
      date: `${year}-${month}-01`
    }
  };

  return bigquery.query(options);
};

module.exports = bigQuery;
