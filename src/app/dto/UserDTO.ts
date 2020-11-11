export default class UserDTO {
  constructor(name: string, dob: string, email: string, password: string) {
    this._name = name;
    this._dob = dob;
    this._email = email;
    this._password = password;
  }

  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _dob: string;

  get dob(): string {
    return this._dob;
  }

  set dob(value: string) {
    this._dob = value;
  }

  private _email: string;

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  private _password: string;

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }
}
