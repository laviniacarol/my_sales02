import { Router } from "express";
import CustomersControllers from "../controllers/CustumersControllers";
import AuthMiddleware from "@shared/middlewares/authMiddleware";

const customersRouter = Router();
const customersControllers = new CustomersControllers();

customersRouter.use(AuthMiddleware.execute);
customersRouter.get("/", customersControllers.index);
customersRouter.get("/:id", customersControllers.show);
customersRouter.post("/", customersControllers.create);
customersRouter.put("/:id", customersControllers.update);
customersRouter.delete("/:id", customersControllers.delete);

export default customersRouter;
