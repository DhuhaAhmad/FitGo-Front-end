export class User {
    constructor(
      private _id: number | null,
      private _name: string,
      private _username: string,
      private _email: string,
      private _password: string,
      private _roles: any[]
    ) {}
  
    public get roles(): any[] {
      return this._roles;
    }
    public set roles(value: any[]) {
      this._roles = value;
    }
    public get password(): string {
      return this._password;
    }
    public set password(value: string) {
      this._password = value;
    }
    public get email(): string {
      return this._email;
    }
    public set email(value: string) {
      this._email = value;
    }
    public get id(): number | null {
      return this._id;
    }
    public set id(value: number | null) {
      this._id = value;
    }
  
    public get name(): string {
      return this._name;
    }
    public set name(value: string) {
      this._name = value;
    }
    public get username(): string {
      return this._username;
    }
    public set username(value: string) {
      this._username = value;
    }
  
    public toJSON(): object {
      return {
        id: this._id,
        name: this._name,
        email: this._email,
        password: this._password,
        roles: this._roles,
      };
    }
  }
  