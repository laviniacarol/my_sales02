import AppError from "@shared/errors/AppError";
import { Product } from "../database/entities/Product";
import { productsRepositories } from "../database/repositories/ProductsRepositories";
import { ICreateProduct } from "../domain/models/ICreateProduct";

export default class CreateProductService {
  async execute(
    { name, price, quantity }: ICreateProduct
  ): Promise<Product> {

    const productExists = await productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError("Product already exists");
    }

    const product = productsRepositories.create({
      name,
      price,
      quantity,
    });

    await productsRepositories.save(product);

    return product;
  }
}
