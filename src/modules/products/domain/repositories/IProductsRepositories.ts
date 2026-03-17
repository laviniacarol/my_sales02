
import { Product } from "@modules/products/database/entities/Product";
import { ICreateProduct } from "../models/ICreateProduct";

export interface IFindProducts {
  id: string;
}

export interface IProductsRepository {
  find(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  create(data: ICreateProduct): Product;
  save(product: Product): Promise<Product>;
  delete(criteria: unknown): Promise<unknown>;
}
