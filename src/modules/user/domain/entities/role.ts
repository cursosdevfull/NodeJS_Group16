export class Role {
  readonly roleId: number;
  readonly name: string;

  constructor(roleId: number, name: string) {
    this.roleId = roleId;
    this.name = name;
  }
}
