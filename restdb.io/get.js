var request = require("request");

var options = {
    method: 'GET',
    url: 'https://mathee-cfeb.restdb.io/rest/employees',
    headers: 
    {   'cache-control': 'no-cache',
        'x-apikey': '5ce3f7ee780a473c8df5ca47' 
    } 
};

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(body);
});
                    