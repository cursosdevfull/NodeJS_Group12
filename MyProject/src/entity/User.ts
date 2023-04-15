import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Car } from "./Car";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50, nullable: true })
  name: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "int" })
  age: number;

  @Column({ type: "boolean", default: true })
  active: boolean;

  @ManyToMany(() => Car, (car) => car.users)
  cars: Promise<Car[]>;
}
