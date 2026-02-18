import "dotenv/config";
import "express-async-errors";

import cors from "cors";
import express from "express";

import routes from "./routes";
import ErrorHandleMiddleware from "@shared/middlewares/ErrorHandleMiddleware";
import { AppDataSource } from "@shared/typeorm/data-source";

const app = express();

app.use(cors({
  exposedHeaders: ['Authorization'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(ErrorHandleMiddleware.handleErrors);

const port = Number(process.env.PORT) || 3333;

AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`API running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Data Source initialization error:", err);
  });
