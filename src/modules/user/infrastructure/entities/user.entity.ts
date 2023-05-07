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

  @Column({ type: "varchar", length: 100 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "varchar", length: 100 })
  photo: string;

  @Column({ type: "bool", default: true })
  active: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
