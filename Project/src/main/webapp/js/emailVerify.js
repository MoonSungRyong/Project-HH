var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pool = mysql.createPool({
	connectionLimit : 10,
	host     : 'localhost',
	user     : 'java85',
	password : '1111',
	database : 'objackie',
	port : '3306'
});

app.use(bodyParser.json());	
app.use(bodyParser.urlencoded({extended:true}))

app.post('/hh/auth/emailVerify.json', function(request, response) {
	console.log(request.body.email)

	pool.query(
			"select count(email) as cnt from membs where email=?",
			[request.body.email],
			function(err, rows, fields) {
				response.writeHead(200, {
					'Content-Type' 					: 'application/json;charset=UTF-8',
					'Access-Control-Allow-Origin'	: 'http://localhost:8080',
					'Access-Control-Allow-Methods'	: 'POST, GET, OPTIONS, DELETE',
					'Access-Control-Max-Age'		: '3600',
					'Access-Control-Allow-Headers'	: 'x-requested-with'
				});
				if(err){ 
					console.log(err);
				}

				if (rows[0].cnt == 0) {
					response.write(JSON.stringify({
						'state':'success'
					}));
				} else {
					response.write(JSON.stringify({
						'state':'fail'
					}));			
				}
				response.end();
			})
});


app.listen(8000);
console.log("서버 실행중...");