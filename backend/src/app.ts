import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { secret } from './config';
import { routes } from './routes';
import { errorMiddleware } from './middleware/errorMiddleware';

export const app = express();

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errorMiddleware);
