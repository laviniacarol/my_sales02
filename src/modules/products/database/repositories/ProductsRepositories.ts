import { AppDataSource } from "@shared/infra/typeorm/data-source";
import { Product } from "@modules/products/database/entities/Product";
import { In } from "typeorm";

interface IFindProducts {
  id: string;
}

export const productsRepositories = AppDataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | undefined> {
    return (await this.findOneBy({ name })) ?? undefined;
  },

  async findById(id: string): Promise<Product | undefined> {
    return (await this.findOneBy({ id })) ?? undefined;
  },

  async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    return this.find({
      where: { id: In(productsIds) },
    });
  },
});
