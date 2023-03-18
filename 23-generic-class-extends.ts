// Domain

abstract class BaseEntity {
  createdAt: Date = new Date();
  updatedAt?: Date;
  deletedAt?: Date;
}

class Medic extends BaseEntity {
  constructor(public id: string, public name: string, public lastname: string) {
    super();
  }
}

class User extends BaseEntity {
  constructor(
    public id: number,
    public username: string,
    public password: string
  ) {
    super();
  }
}

abstract class IRepository<Entity extends BaseEntity, TypePrimaryKey> {
  save(entity: Entity): Entity {
    console.log(entity.createdAt);
    return entity;
  }
  update(id: TypePrimaryKey, entity: Entity): Entity {
    return entity;
  }
}

abstract class IRepositoryMedic extends IRepository<Medic, string> {
  report(): void {}
}

// Infrastructure

class MedicInfrastructure extends IRepositoryMedic {
  //implements IRepository<Medic, string>
  save(medic: Medic): Medic {
    return medic;
  }
  update(id: string, medic: Medic): Medic {
    return medic;
  }

  report() {}
}

class UserInfrastructure extends IRepository<User, number> {
  save(user: User): User {
    return user;
  }
  update(id: number, user: User): User {
    return user;
  }
}
