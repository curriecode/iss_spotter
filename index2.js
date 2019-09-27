const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  printPassTimes
} = require('./iss_promised');

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then((fetchIPResp) => {
      fetchIPResp = JSON.parse(fetchIPResp);
      return fetchCoordsByIP(fetchIPResp.ip);
    })
    .then((fetchCoordsResp) => {
      return fetchISSFlyOverTimes(JSON.parse(fetchCoordsResp).data);
    }).then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  }).catch((error) => {
    console.log("It didn't work: ", error.message);
  });