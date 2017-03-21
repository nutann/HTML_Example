var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('Events1.db');
var JSON = require('JSON');

var createDB = function(){
	//Create the db
		
		
		
		db.serialize(function(){
		
		 //create Events Table
		db.run("DROP TABLE Events");
		db.run("CREATE TABLE IF NOT EXISTS Events(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, date TEXT,time TEXT,address TEXT,city TEXT)");  
		
		db.run("INSERT into Events(name,date,time,address,city) VALUES ('Java','10-02-2016','10:30','BTM','Bangalore')");
		db.run("INSERT into Events(name,date,time,address,city) VALUES ('C++','10-02-2017','10:30','BTM','Bangalore')");
		db.run("INSERT into Events(name,date,time,address,city) VALUES ('HTML','10-07-2016','10:30','BTM','Bangalore')");
		db.run("INSERT into Events(name,date,time,address,city) VALUES ('NODEJS','10-08-2016','10:30','BTM','Bangalore')");
		db.run("INSERT into Events(name,date,time,address,city) VALUES ('ANGULAR JS','19-02-2016','10:30','BTM','Bangalore')");
		
		//create sessions Table
		 db.run("DROP TABLE sessions");
		db.run("CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT,title Text,author Text,duration INT,details TEXT,event_id INTEGER,FOREIGN KEY(event_id) REFERENCES events(id))");
		

		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('Springs','Pluto',120,'This is the session on springs',1)");
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('Hibernate','Pluto',120,'This is the session on Hibernate',1)");
		
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('classes','Pluto',120,'This is the session on classes',2)");
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('Inheritance','Pluto',120,'This is the session on Inheritance',2)");
		
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('Events','Pluto',120,'This is the session on Events',3)");
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('css','Pluto',120,'This is the session on css',3)");
		
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('event loop','Pluto',120,'This is the session on event loop',4)");
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('express','Pluto',120,'This is the session on express',4)");
		
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('services','Pluto',120,'This is the session on services',5)");
		db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('modules','Pluto',120,'This is the session on modules',5)");
		
		

	
	 
		});
		
}

var getSessions = function(callback,id){

	db.all("SELECT id, title,author FROM sessions where event_id =" + id, function(err, rows) {  
		callback(rows);
		});

	
}

var getEvents = function(callback){

	db.all("SELECT id, name FROM Events", function(err, rows) {  
			callback(rows);  
		}); 

}

var getItems = function(callback){
var items =[];
var onDone = function(){
	callback(items);
}


	db.all("SELECT id, name FROM Events", function(err, rows) { 
			
			var eventscount = rows.length;
			var rowCount = 0;
			rows.forEach(function (row) {
				items.push(row); 
				

				
				db.all("SELECT id, title,author,duration,details FROM sessions where event_id =" + row.id, function(err, rows) {
					rowCount++;
					items[row.id-1].events = (rows);
					console.log("eventscount "+eventscount  +"rowcount" +rowCount)
					if(eventscount == rowCount)
					{
						console.log("call the onDone");
						onDone();	
					}
					
				});
				

			}); 
				
		});



}

var updateEvent =  function(data,callback){
	console.log("data to be entered in db " +JSON.stringify(data));

	var name = data[0].value;
	var date = data[1].value;
	var time = data[2].value;
	var address = data[3].value;
	var city = data[4].value;
	db.run("INSERT into Events(name,date,time,address,city) VALUES (?,?,?,?,?)",name,date,time,address,city);
	callback();
}
var updateSession =  function(data,callback){
	console.log("data to be entered in db " +JSON.stringify(data));

	var title = data[0].value;
	var author = data[1].value;
	var duration = data[2].value;
	var details = data[3].value;
	var selectedSession = data[4].selectedSession;
	console.log("***********insert into sessions******" +selectedSession);

	//db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES ('modules','Pluto',120,'This is the session on modules',5)");
	db.run("INSERT into sessions(title,author,duration,details,event_id) VALUES (?,?,?,?,?)",title,author,duration,details,selectedSession);
	callback();
}

module.exports.createDB = createDB;
module.exports.getSessions = getSessions;
module.exports.getEvents = getEvents;
module.exports.getItems = getItems;
module.exports.updateEvent = updateEvent;
module.exports.updateSession = updateSession;
