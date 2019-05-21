var express = require('express')
    , bodyParser = require('body-parser')
    , config = require('./config')
    , request = require("request")
    , where = require("lodash.where");

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/', function (req, res) {
    res.render('index', { employee: null, error: null });
})

app.post('/', function (req, res) {

    var name = req.body.name;

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
            var data = where(employee, { "Name": name });

            if (!data || !data.length) {
                res.render('index', { employee: null, error: 'Employee ' + name + ' does not exist. Kindly check the spelling!' });
            }
            else {

                let responseText = `${data[0].Name} has ${data[0].Value}!`;
                res.render('index', { employee: responseText, error: null });
            }
        }
    });

})

module.exports = app;