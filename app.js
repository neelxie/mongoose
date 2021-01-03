var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var db = 'mongodb://localhost/example';

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', function(req, res){
    res.send('We got this!');
});

app.get('/books', function(req, res){
    console.log('Getting all books!');
    Book.find({})
        exec(function(err, books){
            if (err){
                res.send('Error has occured');
            } else {
                console.log(books);
                res.json(books);
            }
        })
});

var port = 8080;

app.listen(port, function(){
    console.log('App listening on port ' + port);
});
