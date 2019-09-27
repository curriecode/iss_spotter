// It will require and run our main fetch function.

const { fetchMyIP } = require('./iss');

fetchMyIP((err, ip) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});