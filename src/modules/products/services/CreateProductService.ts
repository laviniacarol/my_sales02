import AppError from "@shared/errors/AppError";
import { Product } from "../database/entities/Product";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import { ICreateProduct } from "../domain/models/ICreateProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepositories";

export default class CreateProductService {
  constructor(private productsRepository: IProductsRepository = productsRepositories) {}
  async execute(
    { name, price, quantity }: ICreateProduct
  ): Promise<Product> {

    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError("Product already exists");
    }

    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await this.productsRepository.save(product);

    return product;
  }
}
