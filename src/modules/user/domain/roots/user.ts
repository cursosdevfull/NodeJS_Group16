import { v4 as uuidv4 } from "uuid";

import { Role } from "../entities/role";

export interface UserRequired {
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface UserOptional {
  userId: number;
  refreshToken: string;
  secret: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}

export type UserProperties = UserRequired & Partial<UserOptional>;
export type UserPropertiesToUpdate = Partial<
  Omit<UserRequired, "email"> & Pick<UserOptional, "refreshToken">
>;

export class User {
  private userId: number;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private roles: Role[];
  private refreshToken: string;
  private secret: string;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(props: UserProperties) {
    Object.assign(this, props);
    if (!props.createdAt) this.createdAt = new Date();
    if (!props.refreshToken) this.refreshToken = uuidv4();
  }

  get properties() {
    return {
      userId: this.userId,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      roles: this.roles,
      refreshToken: this.refreshToken,
      secret: this.secret,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(props: UserPropertiesToUpdate) {
    Object.assign(this, props);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
