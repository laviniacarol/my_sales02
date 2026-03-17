import RedisCache from "@shared/cache/RedisCache";
import { Product } from "../database/entities/Product";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import { IUpdateProduct } from "../domain/models/IUpdateProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepositories";

export default class UpdateProductService {
  constructor(private productsRepository: IProductsRepository = productsRepositories) {}
  async execute({ name, price, quantity, id }: IUpdateProduct): Promise<Product> {

    const product = await this.productsRepository.findById(id);
    const redisCache = new RedisCache();


    if (!product) {
      throw new Error("Product not found");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    const updatedProduct = await this.productsRepository.save(product);

    await redisCache.invalidate('api-mysales-PRODUCT_LIST');

    return updatedProduct;
  }
}
