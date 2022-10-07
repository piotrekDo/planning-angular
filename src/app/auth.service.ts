import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {AuthResponseDataModel} from "./model/auth-response-data.model";
import {UserModel} from "./model/user.model";
import {environment} from "../environments/environment";
import {PageModel} from "./model/page.model";
import {UserListModel} from "./model/user-list.model";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  activeUser = new BehaviorSubject<UserModel>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient,
              private router: Router) {
  }

  autoLogIn() {
    const userData:
      {
        roles: string[];
        username: string;
        _accessToken: string;
        _accessTokenExpireAt: string; // TO TRZEBA PRZEKSZTAŁCIC na DATE
        _refreshToken: string;
      } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new UserModel(
      userData.username, userData._accessToken, new Date(userData._accessTokenExpireAt), userData._refreshToken, userData.roles);
    if (loadedUser.accessToken) {
      this.activeUser.next(loadedUser);
      const expirationDuration = new Date(userData._accessTokenExpireAt).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(experationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, experationDuration);
  }

  logIn(username: string, password: string): Observable<AuthResponseDataModel> {
    return this.http.post<AuthResponseDataModel>(environment.mainUrl + 'login', {
      username: username,
      userPassword: password
    })
      .pipe(catchError(this.handleError), tap(resdata => {
        this.handleAuthentication(resdata);
      }))
  }

  logout() {
    this.activeUser.next(null);
    this.router.navigate(['/home']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  getUsers(): Observable<PageModel<UserListModel>> {
    return this.http.get<PageModel<UserListModel>>(environment.mainUrl + 'users');
  }

  getUser(id: number): Observable<UserListModel> {
    return this.http.get<UserListModel>(environment.mainUrl + `users/${id}`)
  }

  registerNewUser(newUser: { userEmail: string, username: string }): Observable<{ userEmail: string, username: string }> {
    return this.http.post<{ userEmail: string, username: string }>(environment.mainUrl + 'users/save', newUser);
  }

  deleteUser(user: { username: string }): Observable<{ username: string }> {
    return this.http.delete<{ username: string }>(environment.mainUrl + 'users/delete-user',
      {
        body: user,
      });
  }

  addRoleToUser(role: { roleName: string, username: string }): Observable<{ roleName: string, username: string }> {
    return this.http.post<{ roleName: string, username: string }>(environment.mainUrl + 'users/role/add-to-user', role)
  }

  removeRoleFromUser(role: { roleName: string, username: string }): Observable<{ roleName: string, username: string }> {
    return this.http.post<{ roleName: string, username: string }>(environment.mainUrl + 'users/role/remove-from-user', role)
  }

  sendResetPasswordTokenRequest(request: { email: string, username: string }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(environment.mainUrl + 'users/password-reset-request', request)
      .pipe(catchError(this.handleError));
  }

  sendResetPasswordRequest(request: { token: string, newPassword: string, username: string }): Observable<{ username: string }> {
    return this.http.post<{ username: string }>(environment.mainUrl + 'users/password-change', request)
      .pipe(catchError(this.handleError));
  }

  private handleAuthentication(resdata: AuthResponseDataModel) {
    const newUser = UserModel.newUser(resdata);
    this.activeUser.next(newUser);
    let expTime = new Date(resdata.access_token_expires_at).getTime() - new Date().getTime();
    this.autoLogout(expTime);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse)
    let errorMessage = 'An error occurred!';
    if (!errorResponse.error || !errorResponse.error.details) {
      return throwError(errorMessage);
    }
    return throwError(errorResponse.error.details);
  }
}

