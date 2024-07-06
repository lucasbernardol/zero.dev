import express from 'express';

import cors from 'cors';
import helmet from 'helmet';

import morgan from 'morgan';
import { router } from './routes';

export const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.use(helmet());

app.use(morgan('dev'));

app.use(router);
