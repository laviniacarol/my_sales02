import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ICustomer } from "@modules/customers/domain/models/ICustumer";

@Entity('customers')
export class Customer implements ICustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
