import {AuthResponseDataModel} from "./auth-response-data.model";

export class UserModel {
  constructor(
    public username: string,
    private _accessToken: string,
    private _accessTokenExpireAt: Date,
    private _refreshToken: string,
    public roles: string[]
  ) {
  }

  static newUser(authRes: AuthResponseDataModel): UserModel {
    return new UserModel(
      authRes.username,
      authRes.access_token,
      new Date(authRes.access_token_expires_at),
      authRes.refresh_token,
      this.createRoles(authRes.roles)
    );
  }

  get accessToken() {
    if (!this._accessToken || new Date() > this._accessTokenExpireAt) {
      return null;
    }
    return this._accessToken;
  }

  private static createRoles(string: string): string[] {
    const searchRegExp = new RegExp(" ", 'g'); // Throws SyntaxError
    let s = string.replace('[', '').replace(']', '').replace(searchRegExp, '');
    let roles = s.split(',');
    roles.forEach(role => role.replace(' ', ''));
    console.log('admin ' + roles.indexOf('ADMIN'))
    console.log('mod ' + roles.indexOf('MODERATOR'))
    console.log('user ' + roles.indexOf('USER'))
    return roles;
  }

}
