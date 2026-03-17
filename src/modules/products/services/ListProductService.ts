import RedisCache from "@shared/cache/RedisCache";
import { Product } from "../database/entities/Product";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import { IProductsRepository } from "../domain/repositories/IProductsRepositories";

export default class ListProductService {
  constructor(private productsRepository: IProductsRepository = productsRepositories) {}
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCT_LIST',
    );

    if(!products) {
      products = await this.productsRepository.find();

      await redisCache.save(
        'api-mysales-PRODUCT_LIST',
        JSON.stringify(products));
    }

    return products;
  }
}
