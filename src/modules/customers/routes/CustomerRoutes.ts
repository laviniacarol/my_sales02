import { Router } from "express";
import CustomersControllers from "../controllers/CustumersControllers";
import AuthMiddleware from "@shared/middlewares/authMiddleware";
import { idParamValidation } from "@modules/products/schemas/ProductSchema";
import { idParamsValidate, UpdateCustomerSchema } from "../schemas/CustomerSchema";

const customersRouter = Router();
const customersControllers = new CustomersControllers();

customersRouter.use(AuthMiddleware.execute);
customersRouter.get("/", customersControllers.index);
customersRouter.get("/:id", idParamsValidate, customersControllers.show);
customersRouter.post("/", customersControllers.create);
customersRouter.patch("/:id", idParamsValidate, UpdateCustomerSchema, customersControllers.update);
customersRouter.delete("/:id", idParamsValidate, customersControllers.delete);

export default customersRouter;
