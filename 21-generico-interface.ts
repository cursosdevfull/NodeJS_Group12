interface IRepository<Entity, TypePrimaryKey> {
  save(entity: Entity): Entity;
  update(id: TypePrimaryKey, entity: Entity): Entity;
}

class Medic {
  constructor(
    public id: string,
    public name: string,
    public lastname: string
  ) {}
}

/* interface IRepositoryMedic {
    save(medic: Medic): Medic
    update(id: string, medic: Medic): Medic
  } */

class MedicInfrastructure
  implements IRepository<Medic, string> /*IRepositoryMedic*/
{
  save(medic: Medic): Medic {
    return medic;
  }
  update(id: string, medic: Medic): Medic {
    return medic;
  }
}

class User {
  constructor(
    public id: number,
    public username: string,
    public password: string
  ) {}
}

/* interface IRepositoryUser {
    save(user: User): User
    update(id: number, user: User): User
  } */

class UserInfrastructure
  implements IRepository<User, number> /*IRepositoryUser*/
{
  save(user: User): User {
    return user;
  }
  update(id: number, user: User): User {
    return user;
  }
}
