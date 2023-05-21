export interface IRedisConfig {
  host: string;
  port: number;
  password: string;
  maxRetriesPerRequest: number;
}

export class Parameters {
  static readonly PORT = process.env.PORT || 3000;

  static get ENVIRONMENT() {
    return process.env.NODE_ENV || "development";
  }

  static get SECRET_KEY_WORD() {
    return (
      process.env.SECRET_KEY_WORD || "a7ee030a-bb1c-460c-96de-d4c6cef5ad9a"
    );
  }

  static get TOKEN_EXPIRATION() {
    return Number(process.env.TOKEN_EXPIRATION) || 5;
  }

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
      logging: process.env.DB_LOGGING === "false" ? false : false,
      poolSize: Number(process.env.DB_POOL_SIZE) || 10,
      maxQueryExecutionTime:
        Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 10000,
    };
  }

  static get REDIS_CONFIG(): IRedisConfig {
    return {
      host: process.env.REDIS_HOST || "localhost",
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD || "todovale",
      maxRetriesPerRequest:
        Number(process.env.REDIS_MAX_RETRIES_PER_REQUEST) || 3,
    };
  }
}
