// It will contain most of the logic for fetching the data from each API endpoint.
// const args = process.argv.slice(2);
const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {
    if (err) {
      throw new Error("woops something is wrong with the request");
    }
    if (err) return callback(err, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://ipvigilante.com/${ip}`, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body).data;

    callback(null, { latitude, longitude });
  });
};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};