// Domain
class Medic {
  constructor(
    public id: string,
    public name: string,
    public lastname: string
  ) {}
}

class User {
  constructor(
    public id: number,
    public username: string,
    public password: string
  ) {}
}

interface IRepository<Entity, TypePrimaryKey> {
  save(entity: Entity): Entity;
  update(id: TypePrimaryKey, entity: Entity): Entity;
}

interface IRepositoryMedic extends IRepository<Medic, string> {
  report(): void;
}

// Infrastructure

class MedicInfrastructure implements IRepositoryMedic {
  //implements IRepository<Medic, string>
  save(medic: Medic): Medic {
    return medic;
  }
  update(id: string, medic: Medic): Medic {
    return medic;
  }

  report() {}
}

class UserInfrastructure implements IRepository<User, number> {
  save(user: User): User {
    return user;
  }
  update(id: number, user: User): User {
    return user;
  }
}
