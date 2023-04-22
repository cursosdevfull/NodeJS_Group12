import { EntityManager, QueryRunner } from "typeorm";

export interface IUnitOfWork {
  start(): void;
  complete(work: () => Promise<void>): Promise<void>;
  getManager(): EntityManager;
}

export class UnitOfWork implements IUnitOfWork {
  queryRunner: QueryRunner;
  transactionManager: EntityManager;

  constructor(manager: EntityManager) {
    this.queryRunner = manager.connection.createQueryRunner();
  }

  async start() {
    await this.queryRunner.startTransaction();
    this.transactionManager = this.queryRunner.manager;
  }

  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
    } finally {
      this.queryRunner.release();
    }
  }

  getManager(): EntityManager {
    if (
      !this.transactionManager ||
      !(this.transactionManager instanceof EntityManager)
    ) {
      throw new Error("Transaction not started");
    }

    return this.transactionManager;
  }
}
