import productsRouter from '@modules/products/routes/ProductRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello dev, im alive :p'});
});
routes.use('/products',productsRouter)

export default routes;
