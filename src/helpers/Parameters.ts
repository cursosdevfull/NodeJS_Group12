export class Parameters {
  static readonly PORT = process.env.PORT || 3000;

  static get DB_CONFIG() {
    return {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT) || 3306,
      entities: [
        process.env.DB_ENTITIES || "src/**/infrastructure/**/*.entity.ts",
      ],
      username: process.env.DB_USERNAME || "user",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_DATABASE || "db",
      synchronize: process.env.DB_SYNCHRONIZE === "false" ? false : true,
      logging: process.env.DB_LOGGING === "false" ? false : true,
      poolSize: Number(process.env.DB_POOL_SIZE) || 10,
      maxQueryExecutionTime:
        Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 10000,
    };
  }
}
