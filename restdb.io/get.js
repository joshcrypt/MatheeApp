var request = require("request")
, config = require("./config");

var options = {
    method: 'GET',
    url: 'https://mathee-cfeb.restdb.io/rest/employees',
    headers:
    {
        'cache-control': 'no-cache',
        'x-apikey': config.dbKey
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});
