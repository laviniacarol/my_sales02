import productsRouter from '@modules/products/routes/ProductRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import { Router } from 'express';
import avatarRouter from '@modules/users/routes/AvatarRoutes';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello dev, im alive :p'});
});
routes.use('/products',productsRouter)
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/avatar', avatarRouter);
export default routes;
