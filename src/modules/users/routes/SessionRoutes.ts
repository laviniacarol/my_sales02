import { Router } from "express";
import SessionsController from "../controllers/SessionsController";
import { sessionSchemaValidation } from "../schema/SessionSchema";

const sessionRouter = Router();
const sessionsController = new SessionsController();

sessionRouter.post(
  "/",
  sessionSchemaValidation,
  sessionsController.create.bind(sessionsController)
);


export default sessionRouter;
