import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { secret } from './config';

export const app = express();

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use(cors);
