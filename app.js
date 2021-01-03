var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var db = 'mongodb://localhost/example';

mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function(req, res){
    res.send('We got this!');
});

app.get('/books', function(req, res){
    console.log('Getting all books!');
    Book.find({})
        .exec(function(err, books){
            if (err){
                res.send('Error has occured');
            } else {
                console.log(books);
                res.json(books);
            }
        })
});

app.get('/books/:id', function(req, res){
    console.log('Getting one book!');
    Book.findOne({
        _id: req.params.id
    })
        .exec(function(err, book){
            if (err){
                res.send('Error has occured');
            } else {
                console.log(book);
                res.json(book);
            }
        })    
});

app.post('/books', function(req, res){
    console.log('Creating a new book!');

    var newBook = new Book();

    newBook.title = req.body.title;
    newBook.author = req.body.author;
    newBook.category = req.body.category;

    newBook.save(function(err, book){
        if (err){
            res.send('Error has occured');
        } else {
            console.log(book);
            res.json(books);
        }
    })
});

var port = 8080;

app.listen(port, function(){
    console.log('App listening on port ' + port);
});
