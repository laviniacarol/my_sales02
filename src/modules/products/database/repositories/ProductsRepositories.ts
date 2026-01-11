import { AppDataSource } from "@shared/typeorm/data-source";
import { Product } from "@modules/products/database/entities/Product";

export const productsRepositories = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {

    return this.findOneBy({ name } );
  }
})
