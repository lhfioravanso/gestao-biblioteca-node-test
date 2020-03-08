import express from 'express';
import bodyParser from 'body-parser';
import routes from './api/routes';
import expressValidator from 'express-validator';

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(expressValidator());

routes(app);

app.listen(port);
console.log('RESTful API server started on: ' + port);

module.exports = app;