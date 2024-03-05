import { BaseRepository } from "@core/domain/repositories/base.repository";

import { User } from "../roots/user";

export interface UserRepository extends BaseRepository<User> {}
