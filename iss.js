const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org?format=json', (err, response, body) => {

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


const fetchISSFlyOverTimes = (coords, callback) => {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (err, response, body) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};




const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }

    fetchCoordsByIP(ip, (err, loc) => {
      if (err) {
        return callback(err, null);
      }

      fetchISSFlyOverTimes(loc, (err, nextPasses) => {
        if (err) {
          return callback(err, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};



module.exports = {
  nextISSTimesForMyLocation
};