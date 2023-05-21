export interface AuthRepository {
  getByEmail(email: string): Promise<any>;
  getByRefreshToken(refreshToken: string): Promise<any>;
  getUserList(): Promise<any>;
}
