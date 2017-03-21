		var express = require('express');
		var dbConnector = require("./dbConnector")

		var bodyParser = require('body-parser');
				//create the express app
		var app = express();

		// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

		
		//create the db 
		dbConnector.createDB();

		var sessioncallback = function(rows){
			console.log("sessions == > " +JSON.stringify(rows));
		}
		var rows = dbConnector.getSessions(sessioncallback,1);

		var eventscallback = function(rows){
			console.log("events == > " +JSON.stringify(rows));
		}
		var rows = dbConnector.getEvents(eventscallback,1);
		
		

		app.use(bodyParser.json()); // support json encoded bodies
		app.use(bodyParser.urlencoded({ extended: true }));
		app.get('/',function(request,response){
		
		var itemscallback = function(rows){
		// response.setHeader('Content-Type','text/event-stream');
		// response.setHeader("Access-Control-Allow-Origin", "*");
  //   	response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		response.write(JSON.stringify(rows));
		response.end();

		}
		var rows = dbConnector.getItems(itemscallback);
		
	
		});
		app.post('/updateEvent',function(req,res){

			console.log("****************post data******************* " +JSON.stringify(req.body));
			var updatecallback = function(){
				res.send("updated the values");
				res.end();
			}
			var rows = dbConnector.updateEvent(req.body,updatecallback);
			
		});

		app.post('/updateSession' ,function(req,res){

			console.log("*************post data*****" +JSON.stringify(req.body));
			var updatecallback = function(){
				res.send("updated the values");
				res.end();
			}
			var rows = dbConnector.updateSession(req.body,updatecallback); 
		});
		//listen to port 8080
		app.listen(8080,function(err){
		console.log("listening to port 8080")
		});