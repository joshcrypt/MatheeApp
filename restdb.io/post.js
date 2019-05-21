var request = require("request")
, config = require("./config");

var options = {
    method: 'POST',
    url: 'https://mathee-cfeb.restdb.io/rest/employees',
    headers:
    {
        'cache-control': 'no-cache',
        'x-apikey': config.dbKey,
        'content-type': 'application/json'
    },
    body: { Name: 'techjamaa1', Value: 'Paid' },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});

