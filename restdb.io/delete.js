var request = require("request")
, config = require("./config");

var options = {
    method: 'DELETE',
    url: config.url +'/5ce459d5f35d2502000087ec',
    headers:
    {
        'cache-control': 'no-cache',
        'x-apikey': config.dbKey,
        'content-type': 'application/json'
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});