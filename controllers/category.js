var express = require('express');
var app = express();

app.get('/api/ondeencontrar/categories', function (req, res) {
   res.send('Hello World');
})