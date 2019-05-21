var request = require("request")
    , config = require("./config");

var options = {
    method: 'PUT',
    url: config.url + '/5ce3fe6ff35d25020000779b',
    headers:
    {
        'cache-control': 'no-cache',
        'x-apikey': config.dbKey,
        'content-type': 'application/json'
    },
    body: { Value: 'Not Paid' },
    json: true
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});