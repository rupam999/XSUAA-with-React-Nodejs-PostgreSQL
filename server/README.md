// const express = require('express');
// const path = require('path');
// const app = express();
// const port = process.env.port || 8080;

// require('dotenv').config();

// const empl_list = require('./db/employye-list.json');

// if (process.env.NODE_ENV !== 'development') {
// console.log('CALLED');
// const { JWTStrategy } = require('@sap/xssec');
// const xsenv = require('@sap/xsenv');
// const passport = require('passport');

// passport.use(
// new JWTStrategy(xsenv.getServices({ uaa: { tag: 'xsuaa' } }).uaa),
// );

// app.use(passport.initialize());
// app.use(passport.authenticate('JWT', { session: false }));
// }

// // Serve our static build files
// app.use(express.static(path.join(\_\_dirname, './build')));

// app.get('/', (req, res, next) => {
// res.sendFile(path.join(\_\_dirname, './build/index.html'));
// });

// // //Production Route double check
// // const checkScope = (req, res, next) => {
// // if (req.authInfo.checkLocalScope('read')) {
// // next();
// // } else {
// // res.status(403).end('Forbidden');
// // }
// // };

// // app.get('/getemplist', checkScope, (req, res, next) => {
// // const result = [];
// // for (let emp in empl_list) {
// // result.push(empl_list[emp]);
// // }
// // res.send(result);
// // });

// app.get('/getempbyname', (req, res, next) => {
// const result = [];
// for (let emp in empl_list) {
// if (req.query.name == emp) {
// result.push(empl_list[emp]);
// break;
// }
// }
// res.send(result);
// });

// // Serving react on routes unused by previous routing
// app.get('\*', (req, res) => {
// res.sendFile(path.join(\_\_dirname, './build/index.html'));
// });

// app.listen(port, console.log(`Listening on port ${port}`));
