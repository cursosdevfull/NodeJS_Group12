export interface AuthRepository {
  getByEmail(email: string): Promise<any>;
}
