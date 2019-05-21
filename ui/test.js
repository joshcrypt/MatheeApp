var where = require("lodash.where");

var json = '[{"user": "a", "age": 20}, {"user": "b", "age": 30}, {"user": "c", "age": 40}]';

var users = JSON.parse(json);

var filtered = where(users, {"user": "a"});

console.log(filtered);