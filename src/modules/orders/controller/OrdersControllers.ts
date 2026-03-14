import { Request, Response } from "express";
import { ShowOrderService } from "../services/ShowOrderService";
import { CreateOrderService } from "../services/CreateOrderService";


export default class OrderControllers {
  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showOrderService = new ShowOrderService();

    const order = await showOrderService.execute(id);


   return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
      const { customer_id, products } = request.body;
      const createOrder = new CreateOrderService();

      const order = await createOrder.execute({
        customer_id,
        products,
      });

      return response.json(order);
  }
}
