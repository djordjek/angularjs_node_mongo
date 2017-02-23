    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var config = require ('./config');
    var mongoose = require('mongoose');
    
     mongoose.connect(config.database, function(err){
    	if(err){
    		console.log("error database");
    	}else{
    		console.log("connecting to database");
    	}
    });

  
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    
   
    
    app.use(express.static(__dirname + '/public/views'));                 // call index.html in public folder
    
    var api = require('./app/routes/api')(app, express);
    app.use(api);
   

  /*  app.get('*', function(req, res){
    	res.sendFile(__dirname + '/public/views/index.html');
    });*/

     // listen (start app with node server.js) ======================================
    app.listen(config.port);
    console.log("App listening on port 8080");
    