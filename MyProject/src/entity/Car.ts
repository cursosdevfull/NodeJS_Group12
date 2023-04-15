import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "./User";

@Entity({ name: "car" })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  brand: string;

  @Column({ type: "varchar", length: 100 })
  model: string;

  @Column({ type: "varchar", length: 100 })
  color: string;

  @Column({ type: "int" })
  year: number;

  @ManyToMany(() => User, (user) => user.cars)
  @JoinTable()
  users: Promise<User[]>;
}
