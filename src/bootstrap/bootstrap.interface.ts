import { DataSource } from "typeorm";

export interface Bootstrap {
  initialize(): Promise<boolean | DataSource>;
}
