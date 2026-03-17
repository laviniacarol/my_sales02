import AppError from "@shared/errors/AppError";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import RedisCache from "@shared/cache/RedisCache";
import { IDeleteProduct } from "../domain/models/IDeleteProducts";
import { IProductsRepository } from "../domain/repositories/IProductsRepositories";


export default class DeleteProductService {
  constructor(private productsRepository: IProductsRepository = productsRepositories) {}
  async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);
    const redisCache = new RedisCache();


    if (!product) {
      throw new AppError("Product not found", 404);
    }

    await this.productsRepository.delete({ id });

    await redisCache.invalidate('api-mysales-PRODUCT_LIST');
  }
}
