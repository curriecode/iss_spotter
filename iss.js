// It will contain most of the logic for fetching the data from each API endpoint.
// const args = process.argv.slice(2);
const request = require('request');

const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      throw new Error("woops something is wrong with the request");
    }
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.stringify(body);
    callback(null, body)
  });
};
module.exports = { fetchMyIP };