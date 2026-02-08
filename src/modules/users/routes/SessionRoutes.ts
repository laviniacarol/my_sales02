import { Router } from "express";
import SessionsControllers from "../controllers/SessionsControllers";
import { sessionSchema } from "@modules/products/schemas/SessionSchema";

const sessionRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionRouter.post("/", sessionSchema, sessionsControllers.create);

export default sessionRouter;
