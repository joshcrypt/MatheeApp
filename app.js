var bodyParser = require('body-parser')
    , config = require('./config')
    , express = require("express")
    , memoryStorage = require('memorystorage')
    , request = require("request")
    , where = require("lodash.where");

const app = express()

var storage = new memoryStorage('app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get("/", (req, res) => {

    var options = {
        method: 'GET',
        url: config.url,
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': config.dbKey
        }
    };

    request(options, function (error, response, body) {

        if (error) {
            res.render('index', { employee: null, error: 'Error, please try again' });
        }

        else {
            var employee = JSON.parse(body);
            employee.forEach(function (record) {
                var key = record.Name;
                var value = record._id;
                storage.setItem(key, value);
            });

            res.render('index', { employee: null, error: null });
        }
    });
});

app.post('/get', function (req, res) {

    var name = req.body.Name;

    var options = {
        method: 'GET',
        url: config.url,
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': config.dbKey
        }
    };

    request(options, function (error, response, body) {

        if (error) {
            res.render('index', { employee: null, error: 'Error, please try again' });
        }
        else {
            var employee = JSON.parse(body);
            employee.forEach(function (record) {
                var key = record.Name;
                var value = record._id;
                storage.setItem(key, value);
            });
            var data = where(employee, { "Name": name });

            if (!data || !data.length) {
                res.render('index', { employee: null, error: 'Employee ' + name + ' does not exist.' });
            }
            else {

                let responseText = `${data[0].Name} has ${data[0].Value}!`;
                res.render('index', { employee: responseText, error: null });
            }
        }
    });

})

app.post('/post', function (req, res) {

    var data = req.body;
    var name = req.body.Name;
    var value = req.body.Value;

    var options = {
        method: 'POST',
        url: config.url,
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': config.dbKey,
            'content-type': 'application/json'
        },
        body: data,
        json: true
    };

    request(options, function (error, response, body) {

        if (error) {
            res.render('index', { employee: null, error: 'Error, please try again' });
        }
        else {

            let responseText = `Employee: ${name} has been saved with value: ${value}!`;
            res.render('index', { employee: responseText, error: null });

        }
    });

})

app.post('/update', function (req, res) {

    var name = req.body.Name;
    var value = req.body.Value;

    var options = {
        method: 'PUT',
        url: config.url + '/' + storage.getItem(name),
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': config.dbKey,
            'content-type': 'application/json'
        },
        body: { Value: value },
        json: true
    };

    request(options, function (error, response, body) {

        if (error) {
            res.render('index', { employee: null, error: 'Error, please try again' });
        }
        else {
            let responseText = `Employee: ${name} has been updated with value: ${value}!`;
            res.render('index', { employee: responseText, error: null });
        }
    });

})

app.post('/delete', function (req, res) {

    var name = req.body.Name;

    var options = {
        method: 'DELETE',
        url: config.url + '/' + storage.getItem(name),
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': config.dbKey
        }
    };

    request(options, function (error, response, body) {

        if (error) {
            res.render('index', { employee: null, error: 'Error, please try again' });
        }
        else {
            storage.removeItem(name);
            let responseText = `Employee: ${name} has been deleted!`;
            res.render('index', { employee: responseText, error: null });
        }
    });

})

module.exports = app;