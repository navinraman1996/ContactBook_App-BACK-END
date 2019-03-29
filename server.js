let express = require('express');
 app = express(),
 mongoose = require('mongoose'),
 bodyParser = require('body-parser');
  port = process.env.PORT || 3000;

mongoose.connect(
  "mongodb+srv://addressBook_db:addressBook_db@node-rest-addressbook-zzdhh.mongodb.net/test?retryWrites=true", 
    {
        useNewUrlParser: true
    }
);

mongoose.Promise=global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let initApp = require('./api/app');
initApp(app);

// let initApp = require('./api/app').default;
// initApp = (app) => {};

app.listen(port)
// console.log(`Server listening on ${host}:${port}`);
console.log('Contacts Restful API server started on: ' + port);

























// const http = require('http');
// const app = require('./api/app')

// const port = process.env.PORT || 3000;

// const server = http.createServer(app).listen(port, function(err) {
//     if (err) {
//       console.log(err);
//     } else {
//       const host = server.address().address;
//       const port = server.address().port;
//       console.log(`Server listening on ${host}:${port}`);
//     }
// });