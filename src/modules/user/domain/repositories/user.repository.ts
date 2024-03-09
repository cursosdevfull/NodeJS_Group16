import { User } from "../roots/user";

export interface UserRepository {
  save(user: User): Promise<void>;
  getAll(): Promise<User[]>;
  getById(userId: number): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getByRefreshToken(refreshToken: string): Promise<User>;
  getByPage(page: number, pageSize: number): Promise<User[]>;
}
