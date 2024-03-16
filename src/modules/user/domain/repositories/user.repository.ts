import {
  TResultGetAll,
  TResultGetByEmail,
  TResultGetById,
  TResultGetByPage,
  TResultGetByRefreshToken,
  TResultSave,
} from "@user/infrastructure/user.infrastructure";

import { User } from "../roots/user";

export interface UserRepository {
  save(user: User): Promise<TResultSave>;
  getAll(): Promise<TResultGetAll>;
  getById(userId: number): Promise<TResultGetById>;
  getByEmail(email: string): Promise<TResultGetByEmail>;
  getByRefreshToken(refreshToken: string): Promise<TResultGetByRefreshToken>;
  getByPage(page: number, pageSize: number): Promise<TResultGetByPage>;
}
