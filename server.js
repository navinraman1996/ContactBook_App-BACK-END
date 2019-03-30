//importing required files

let express = require('express');
  app = express(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;

// mongoose instance connection url connection
mongoose.connect(
  "mongodb+srv://addressBook_db:addressBook_db@node-rest-addressbook-zzdhh.mongodb.net/test?retryWrites=true", 
  {
      useNewUrlParser: true
  }
);

//making promise globally
mongoose.Promise=global.Promise;

//Adding body parser for handling request and response objects.
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Enabling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Initialize app
let initApp = require('./api/app');
initApp(app);

//Listening on the port
app.listen(port)
// console.log(`Server listening on ${host}:${port}`);
console.log('Server listening on: ' + port);