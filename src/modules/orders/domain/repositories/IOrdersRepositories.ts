import { Customer } from "@modules/customers/infra/database/entities/Customer";
import { Order } from "@modules/orders/database/entities/Order";
import { OrderProducts } from "@modules/orders/database/entities/OrderProducts";

export interface ICreateOrderProducts {
	product: OrderProducts["product"];
	price: OrderProducts["price"];
	quantity: OrderProducts["quantity"];
}

export interface ICreateOrderRepository {
	customer: Customer;
	products: ICreateOrderProducts[];
}

export interface IOrdersRepository {
	findById(id: number): Promise<Order | null>;
	createOrder(data: ICreateOrderRepository): Promise<Order>;
}

