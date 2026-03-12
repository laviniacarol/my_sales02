import { OrderProducts } from "@modules/orders/database/entities/OrderProducts";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")

export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToMany(() => OrderProducts, order_products => order_products.product)
  order_products: OrderProducts[];

  @Column({type: 'text'})
  name: string;

  @Column({type: 'decimal'})
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  updated_at: Date;
}
