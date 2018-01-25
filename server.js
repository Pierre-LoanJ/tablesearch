// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = 3030; //process.env.PORT || 3030;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var path = require('path');
var formidable = require('formidable');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database


require('./config/passport')(passport); // pass passport for configuration

var logger = require('./logs/config.js');
/*
logger.info('server info');
logger.warn('server Warning');
logger.debug('server Debugging info');
logger.debug('server more and more');
logger.error('ERROR try', 'save failed', 'err:' + "er");
*/

// set up our express application
app.use(express.static('./public'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'mysecretkey' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);








////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//								ALGOLIA SEARCH

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


const instantsearch = require('instantsearch.js');


/*
///////////////////     importing data     /////////////////////////////

var fs = require('fs');
for (var i = 5; i < 21; i++) {	
	fs.readFile('./FILE' + i + '.json', function (err, data) {
		if (err) {
		  throw err; 
		}
	  	var datas = eval(data.toString());
		
		const algoliasearch = require('algoliasearch');
		var client = algoliasearch("your_Application_ID", "your_API_Key");
		var index = client.initIndex('dummy');

		//console.log(datas);

		index.addObjects(datas, function(err, content) {
	  	console.log(content);
		});
	});	
}
*/



