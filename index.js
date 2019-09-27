// It will require and run our main fetch function.

const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});

fetchCoordsByIP('162.245.144.188', (err, ip) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log('It worked! Returned: ', ip);
});

const coords = { latitude: '49.26200', longitude: '-123.09230' };

fetchISSFlyOverTimes(coords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log('It worked! Returned flyover times:', passTimes);

});
