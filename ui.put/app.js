var bodyParser = require('body-parser')
    , config = require('./config')
    , express = require("express")
    , request = require("request")    
    , where = require("lodash.where");

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('index', { employee: null, error: null });
});

app.post('/', function (req, res) {

    var name = req.body.Name;
    var value = req.body.Value;

    var _id;

    var get_options = {
        method: 'GET',
        url: config.url,
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': config.dbKey
        }
    };               

    var put_options = {
        method: 'PUT',
        url: config.url + '/' + _id,
        headers:
        {
            'cache-control': 'no-cache',
            'x-apikey': config.dbKey,
            'content-type': 'application/json'
        },
        body: { Value: value },
        json: true
    };

    request(get_options, function (error, response, body) {

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

                _id = data[0]._id;
                console.log(_id);
            }
        }
    }); 

    request(put_options, function (error, response, body) {
        console.log(put_options);

        if (error) {
            res.render('index', { employee: null, error: 'Error, please try again' });
        }
        else {

            let responseText = `Employee: ${name} has been updated with value: ${value}!`;
            res.render('index', { employee: responseText, error: null });

        }
    });

})

module.exports = app;