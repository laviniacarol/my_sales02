import AppError from "@shared/errors/AppError";
import { productsRepositories } from "../database/repositories/ProductsRepositories";

interface IDeleteProductService {
  id: string;
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProductService): Promise<void> {


     const product = await productsRepositories.findById(id);

        if (!product) {
          throw new Error("Product not found");
        }

        await productsRepositories.remove(product);
  }
    }
