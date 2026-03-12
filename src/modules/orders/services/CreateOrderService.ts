
import { Order } from "../database/entities/Order";
import { productsRepositories } from "@modules/products/database/repositories/ProductsRepositories";
import { customerRepository } from "@modules/customers/database/repositories/CustomerRepositories";
import { orderRepositories } from "../database/repositories/OrderRepositories";
import AppError from "@shared/errors/AppError";

interface ICreateOrder {
  customer_id: string;
  products: string[] | number[];
}

export class CreateOrderService {
  async execute({ customer_id, products }: ICreateOrder): Promise<Order> {
    const customerExists = await customerRepository.findById(Number(customer_id));
    if (!customerExists) {
      throw new AppError("Customer not found", 404);
    }

    if (!products.length) {
      throw new AppError("No products provided", 400);
    }

    const productCountById = products.reduce<Record<string, number>>((acc, productId) => {
      const id = String(productId);
      acc[id] = (acc[id] ?? 0) + 1;
      return acc;
    }, {});

    const productIds = Object.keys(productCountById);
    const existsProducts = await productsRepositories.findAllByIds(
      productIds.map(id => ({ id })),
    );

    const inexistentProducts = productIds.filter(
      productId => !existsProducts.some(product => product.id === productId),
    );

    if (inexistentProducts.length) {
      throw new AppError(`Could not find product ${inexistentProducts[0]}`, 404);
    }

    const productsWithInsufficientStock = existsProducts.filter(
      product => product.quantity < (productCountById[product.id] ?? 0),
    );

    if (productsWithInsufficientStock.length) {
      throw new AppError(
        `Insufficient quantity for product ${productsWithInsufficientStock[0].id}`,
        400,
      );
    }

    const serializedProducts = existsProducts.map(product => ({
      product,
      price: product.price,
      quantity: productCountById[product.id],
    }));

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const updatedProducts = existsProducts.map(product => ({
      ...product,
      quantity: product.quantity - (productCountById[product.id] ?? 0),
    }));

    await productsRepositories.save(updatedProducts);

    return order;
  }
}
