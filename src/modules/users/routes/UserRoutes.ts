import { Router } from "express";
import UsersControllers from "../controllers/UserControllers";

const usersRouter = Router();
const usersControllers = new UsersControllers();

usersRouter.get("/", usersControllers.index);
usersRouter.post("/", usersControllers.create);

export default usersRouter;
