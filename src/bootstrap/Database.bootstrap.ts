import { DataSource } from 'typeorm';

import { Parameters } from '../helpers/Parameters';
import { Bootstrap } from './bootstrap.interface';

export default class DatabaseBootstrap implements Bootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<boolean | DataSource> {
    const dbConfig = Parameters.DB_CONFIG;

    const AppDataSource = new DataSource({
      type: 'mysql',
      ...dbConfig,
    });

    DatabaseBootstrap.appDataSource = AppDataSource;

    return AppDataSource.initialize();
  }

  close(): void {
    DatabaseBootstrap.appDataSource?.destroy();
  }

  static get dataSource(): DataSource {
    return DatabaseBootstrap.appDataSource;
  }
}
