import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import errorhandler from 'errorhandler';
import mongoose from 'mongoose';
import boom from 'express-boom';

import routes from '../routes';

const isProduction = process.env.NODE_ENV === 'production';

const sessionMiddleware = () =>
  session({
    secret: process.env.SECRET_SESSION,
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  });

const app = express();
app.use(cors());
app.use(boom());

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(path.join(__dirname, '../public')));
app.use(sessionMiddleware());

if (!isProduction) {
  app.use(errorhandler());
}

mongoose.connect(process.env.MONGODB_URI);
mongoose.set('debug', !isProduction);

app.use(routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

export default app;
