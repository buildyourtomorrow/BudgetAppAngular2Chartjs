var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

//for development
if (process.env.USER === "eliezernunez") {
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://localhost/budgetDB');
}; 

//for production
if (process.env.NODE_ENV === "production") {
	mongoose.connect(process.env.MONGOLAB_URI, function (error) {
		mongoose.Promise = global.Promise;
    	if (error) console.error(error);
    	else console.log('mongo connected');
	});
}; 

require('./models/User');

var routes = require('./routes/index.js'); //get all routes from folder ./routes/index.js

// this is where the Angular 4 app lives.
app.use(express.static(__dirname + '/dist'));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/', routes); // use routes from the folder above.

app.listen(process.env.PORT || 5000);