var express = require('express');
var app = express();

app.use(express.static(__dirname = '/public'));

var developer = 
    [
        { first: 'Alice', last: 'Wonderland' },
        { first: 'Bob', last: 'Marley' }
    ];
    
app.get('/rest/developer/:name', function(req, res) {
    for(var i = 0; i < developer.length; i++) {
        if (developer[i].first == req.params.name){
            res.json(developer[i]);
            break;
        }
    }
});

app.get('/process', function(req, res) {
    res.json(process.env);
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || '3000';
console.log(ip);
console.log(port);

app.listen(port, ip, function () {
    console.log("Example app listening at http://%s:%s", ip, port)
});