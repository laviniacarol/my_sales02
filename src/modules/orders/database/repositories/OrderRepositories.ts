import { AppDataSource } from "@shared/typeorm/data-source";
import { Order } from "../entities/Order";
import { Product } from "@modules/products/database/entities/Product";
import { Customer } from "@modules/customers/database/entities/Customer";
import { OrderProducts } from "../entities/OrderProducts";

interface ICreateOrder {
  customer: Customer;
  products: Array<Pick<OrderProducts, "product" | "price" | "quantity">>;
}


export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: {id},
      relations: ['customer', 'order_products', 'order_products.product']
     });
     return order;
  },
  async createOrder({customer, products}: ICreateOrder): Promise<Order> {
       const order = this.create({
        customer,
        order_products: products,
       });
       await this.save(order);
       return order;
  }
})
