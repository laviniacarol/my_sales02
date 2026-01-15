

import { Router } from 'express';
import ProductControllers from '../controllers/ProductControllers';
import { createProductSchema, idParamValidation, updateProductSchema } from '../schemas/ProductSchema';

const productsRouter = Router();
const productControllers = new ProductControllers();

productsRouter.get('/', productControllers.index);
productsRouter.get('/:id', idParamValidation, productControllers.show);
productsRouter.post('/', createProductSchema, productControllers.create);
productsRouter.put('/:id',updateProductSchema, updateProductSchema, productControllers.update);
productsRouter.delete('/:id', idParamValidation, productControllers.delete);

export default productsRouter;
