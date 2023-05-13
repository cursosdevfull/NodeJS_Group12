import bcrypt from "bcryptjs";

export class Crypt {
  static async toHash(value: string): Promise<string> {
    return await bcrypt.hash(value, bcrypt.genSaltSync(10));
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}
