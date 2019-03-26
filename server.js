const http = require('http');
const app = require('./app')

const port = process.env.PORT || 3000;

const server = http.createServer(app).listen(port, function(err) {
    if (err) {
      console.log(err);
    } else {
      const host = server.address().address;
      const port = server.address().port;
      console.log(`Server listening on ${host}:${port}`);
    }
});
