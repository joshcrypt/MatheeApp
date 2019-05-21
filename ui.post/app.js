var bodyParser = require('body-parser')
    , config = require('./config')
    , express = require("express")
    , request = require("request");

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.render('index', { employee: null, error: null });
});

app.post('/', function (req, res) {

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

module.exports = app;