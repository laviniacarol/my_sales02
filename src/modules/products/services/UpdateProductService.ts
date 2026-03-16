import RedisCache from "@shared/cache/RedisCache";
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
    const redisCache = new RedisCache();


    if (!product) {
      throw new Error("Product not found");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepositories.save(product);

    await redisCache.invalidate('api-mysales-PRODUCT_LIST');

    return product;
  }
}
