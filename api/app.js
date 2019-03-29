'use strict';
module.exports = (app) =>{
    let contactModel = require('./models/contact');

    const contactRoutes = require('./routes/addressBook1');

    contactRoutes(app);
};























// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const addressRoutes = require('../assignment-8-harsha771750/api/routes/addressBook'); 

// mongoose.connect(
//     "mongodb+srv://cts_db:cts_db@contacts-uwssk.mongodb.net/test?retryWrites=true", 
//     {
//         useNewUrlParser: true
//     }
// );
// mongoose.Promise = global.Promise;

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });

// // Routes which should handle requests
// app.use('/addressBook', addressRoutes);

// app.use((req, res, next) => {
//      const error = new Error('Not Found');
//      error.status = 404;
//      next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     });
// });

// module.exports = app;    