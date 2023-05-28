import bcrypt from 'bcryptjs';

export class Crypt {
  static toHash(value: string): Promise<string> {
    return bcrypt.hash(value, bcrypt.genSaltSync(10));
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
