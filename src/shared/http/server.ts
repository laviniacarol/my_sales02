

import 'reflect-metadata';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import routes from './routes';



import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';
import { AppDataSource } from '@shared/typeorm/data-source';

AppDataSource.initialize()
.then(async () => {
  const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(ErrorHandleMiddleware.handleErrors);

console.log("Data Source has been initialized!");


app.listen(3333, () => {
  console.log(`Server is running on port 3333`);
});
})

  .catch(error => {
    console.error("Error during Data Source initialization:", error)
  });

