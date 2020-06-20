import 'reflect-metadata';
import 'dotenv/config';

import './database';
import './container';

import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();

app.use(cors());
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
