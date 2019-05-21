var request = require("request")
, config = require("./config");

var options = {
    method: 'POST',
    url: config.url,
    headers:
    {
        'cache-control': 'no-cache',
        'x-apikey': config.dbKey,
        'content-type': 'application/json'
    },
    body: { Name: 'kenny', Value: 'Not Paid' },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});

