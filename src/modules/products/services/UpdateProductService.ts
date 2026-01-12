import { Product } from "../database/entities/Product";
import { productsRepositories } from "../database/repositories/ProductsRepositories";


interface IUpdateProduct {
  name: string;
  price: number;
  quantity: number;
  id: string;
}

export default class UpdateProductService {
  async execute({ name, price, quantity, id }: IUpdateProduct): Promise<Product> {

    const product = await productsRepositories.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepositories.save(product);

    return product;
  }
}
