import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import 'reflect-metadata';

import * as bootstrap from './bootstrap';

import games from './routes/games';

const app = express();

app.set('port', process.env.PORT || '3001');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../build')));
app.use('/games', games);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

bootstrap.bootstrapApp();

export default app;
