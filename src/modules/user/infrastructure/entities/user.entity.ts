import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { BaseEntity } from "../../../../core/infrastructure/base-entity";
import { RoleEntity } from "../../../role/infrastructure/entities/role.entity";

@Entity({ name: "user" })
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  photo: string;

  @Column({ type: "bool", default: true })
  active: boolean;

  @Column({ type: "varchar", length: 300 })
  refreshToken: string;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
