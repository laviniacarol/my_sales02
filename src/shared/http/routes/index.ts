import productsRouter from '@modules/products/routes/ProductRoutes';
import usersRouter from '@modules/users/routes/UserRoutes';
import sessionsRouter from '@modules/users/routes/SessionRoutes';
import { Router } from 'express';
import avatarRouter from '@modules/users/routes/AvatarRoutes';
import express from 'express';
import uploadConfig from '@config/upload';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
import profileRouter from '@modules/users/routes/ProfileRoutes';
import customersRouter from '@modules/customers/routes/CustomerRoutes';
import ordersRouter from '@modules/orders/routes/OrdersRoutes';


const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'Hello dev, im alive :p'});
});
routes.use('/products',productsRouter)
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/avatar', avatarRouter);
routes.use('/files', express.static(uploadConfig.directory));
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
