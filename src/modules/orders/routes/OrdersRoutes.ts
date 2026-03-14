import { Router } from "express";
import OrderControllers from "../controller/OrdersControllers";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import { createOrderValidate, idParamsValidate } from "../schemas/OrderSchemas";

const ordersRouter = Router();
const orderControllers = new OrderControllers();

ordersRouter.use(AuthMiddleware.execute);

ordersRouter.get("/:id", idParamsValidate, orderControllers.show);
ordersRouter.post("/", createOrderValidate, orderControllers.create);


export default ordersRouter;
