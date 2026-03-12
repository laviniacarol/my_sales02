import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "@modules/customers/database/entities/Customer";

@Entity('orders')
export class Order {
 @PrimaryGeneratedColumn()
 id: number;

 @ManyToOne(() => Customer)
 @JoinColumn({ name: 'customer_id' })
 customer: Customer;

 @CreateDateColumn()
 created_at: Date;

 @UpdateDateColumn()
 updated_at: Date;
}
