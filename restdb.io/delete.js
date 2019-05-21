var request = require("request");

var options = { 
    method: 'DELETE',
    url: 'https://mathee-cfeb.restdb.io/rest/employees/5ce3fe6ff35d25020000779b',
    headers: 
    {   'cache-control': 'no-cache',
        'x-apikey': '5ce3f7ee780a473c8df5ca47',
        'content-type': 'application/json' 
    }
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});