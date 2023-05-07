import { Column } from "typeorm";

export class BaseEntity {
  @Column({ type: "datetime" })
  createdAt: Date;

  @Column({ type: "datetime" })
  updatedAt: Date | null;

  @Column({ type: "datetime" })
  deletedAt: Date | null;
}
