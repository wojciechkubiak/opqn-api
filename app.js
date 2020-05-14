const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');
const sequelize = require('./utils/connect');
const cors = require('cors');
const indexRouter = require('./routes/index');
import Protege from "./models/protege";
import Patron from "./models/patron";
import Exam from "./models/exams";

const app = express();

Patron.hasMany(Protege);
Exam.belongsTo(Protege);
Protege.hasMany(Exam);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(indexRouter);

app.use((req, res, next) => {
  next(httpErrors(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

sequelize.sync()
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    result.status(400).json({error: error})
  });

module.exports = app;