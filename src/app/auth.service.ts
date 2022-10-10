import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {AuthResponseDataModel} from "./model/auth-response-data.model";
import {UserModel} from "./model/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUrl = 'https://planning-piodom.herokuapp.com/'
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
    return this.http.post<AuthResponseDataModel>(this.dbUrl + 'login', {username: username, userPassword: password})
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

  private handleAuthentication(resdata: AuthResponseDataModel) {
    const newUser = UserModel.newUser(resdata);
    this.activeUser.next(newUser);
    let expTime =  new Date(resdata.access_token_expires_at).getTime() - new Date().getTime();
    this.autoLogout(expTime);
    localStorage.setItem('userData', JSON.stringify(newUser));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse)
    let errorMessage = 'An error occurred!';
    if (!errorResponse.error || !errorResponse.error.details) {
      return throwError(errorMessage);
    }
    const details: string = errorResponse.error.details;
    if (details.startsWith('No user found'))
      errorMessage = 'Please check your username'
    if (details.startsWith('Wrong password'))
      errorMessage = 'Please check your password'
    return throwError(errorMessage);
  }
}

