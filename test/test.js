// Example assumes the packages request and request-promise have been installed npm install request request-promise
var rp = require('request-promise');
var apiBaseUri = 'https://api-demo.single-invoice.co/v2.0'; // Production environment endpoint $api_base_uri = 'https://api.single-invoice.co/v2.0';
var coverAPIkey = 'T8Exw7GDVp6csSpe7pahtUicASPwjBqgFA3vcTNTSYUjrdwUTlF9H1Bst6Ai8eti';
var TrafficLightAPIkey = '9uYmRQQ3usafB7pWzRFG35rhFG5RpYWsxYD6xwPGypWCUGU3124Yy4ADA6s4Pl2';
var response = {};
var orgNum = '5567037485';
var countryCode = 'SE';

//var orgNum = prompt('Org. Number?', '5567037485'); We need a prompt solution for testing purposes.ds
//var countryCode = prompt('Country Code? Ex: SE, DK, FI, NO', 'SE');

rp({
  method: 'GET',
  uri: apiBaseUri + '/transactor/' + countryCode + '/RN' + countryCode + '/' + orgNum,
  headers: {
    apikey: coverAPIkey
  },
  json: true
})
  .then(function (res) {
    // request succeeded, the result is available in the res object
    console.log(res);
    response = res;
    var companyid = response.Id;

      rp({
        method: 'GET',
        uri: apiBaseUri + '/trafficlight/' + companyid,
        headers: {
          apikey: TrafficLightAPIkey
        },
        json: true
      })
        .then(function (res) {
          // request succeeded, the result is available in the res object
          console.log(res);
        })
        .catch(function (err) {
          // request failed, the error is available in the err object
          console.log(err);
        })
      ;

  })
  .catch(function (err) {
    // request failed, the error is available in the err object
    console.log(err);
  });
