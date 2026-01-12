

import { Router } from 'express';
import ProductControllers from '../controllers/ProductControllers';

const productsRouter = Router();
const productControllers = new ProductControllers();

productsRouter.get('/', productControllers.index);
productsRouter.get('/:id', productControllers.show);
productsRouter.post('/', productControllers.create);
productsRouter.put('/:id', productControllers.update);
productsRouter.delete('/:id', productControllers.delete);

export default productsRouter;
