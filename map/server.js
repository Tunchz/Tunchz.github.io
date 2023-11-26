var express = require('express')
var app = express();
var listening_port  = process.argv[2] || 8080;
//console.log("port : ", listening_port);

// Set statics folder for project web app
app.use (express.static("./"));

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

app.get('/', function (req, res) {
    // Main DB.Builder App
})

var server = app.listen(listening_port, function () {

   var host = server.address().address
   var port = server.address().port

   console.log("app listening at http://%s:%s", host, port);
   console.log( "Press CTRL + C to stop" );

})