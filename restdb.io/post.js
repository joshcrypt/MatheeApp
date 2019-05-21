// https://restdb.io/docs/quick-start#restdb
// https://restdb.io/docs/rest-api-code-examples#restdb
// https://restdb.io/docs/javascript-api#restdb

var request = require("request");

var options = { 
    method: 'POST',
    url: 'https://mathee-cfeb.restdb.io/rest/employees',
    headers: 
    {   'cache-control': 'no-cache',
        'x-apikey': '5ce3f7ee780a473c8df5ca47',
        'content-type': 'application/json' },
    body: { Name: 'techjamaa1', Value: 'Paid' },
    json: true 
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});

                    