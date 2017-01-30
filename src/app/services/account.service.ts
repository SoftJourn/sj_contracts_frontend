import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { TokenService } from "./token.service";
import { Account } from "../entity/account";
import { HttpService } from "./http.service";
import {AppError} from "../shared/app-error";
import {AppProperties} from "../shared/app.properties";
import {UsernamePasswordCredentials} from "../shared/username-password-credentials";

export const routes: { [key: string]: string[] } = {
  "ROLE_USER": ["/contracts"],
};

@Injectable()
export class AccountService {
  private account: Account;
  private STORAGE_KEY = 'account';

  constructor(private tokenService: TokenService,
              private httpService: HttpService) {
  }

  private createAccount(username: string): Observable<Account> {
    return new Observable<Account>(observer => {
      let accountCreationError = new AppError(
        'auth/creation-failure',
        'Error appeared during account creation please try again later');

      let url = `${AppProperties.AUTH_API}/users/${username}`;

      this.httpService.get(url).subscribe(
        response => {
          if (response.ok) {
            let account = this.createAccountFromJson(response.json());
            observer.next(account);
            observer.complete();
          } else {
            observer.error(accountCreationError);
          }
        },
        error => observer.error(accountCreationError)
      );
    });
  }

  public login(credentials: UsernamePasswordCredentials): Observable<void> {
    return new Observable<void>(observer => {

      this.tokenService.deleteTokensFromStorage();

      let badCredError = new AppError(
        'auth/account-not-found',
        'Wrong credentials'
      );

      if (AccountService.verifyCredentials(credentials)) {
        this.tokenService.getAccessToken(credentials).subscribe(
          accessToken => this.createAccount(credentials.username).subscribe(
            account => {
              this.account = account;
              observer.complete();
            },
            error => observer.error(error)
          ),
          error => observer.error(badCredError)
        );
      } else {
        observer.error(badCredError);
      }
    });
  }

  public logout(): void {
    this.tokenService.revokeRefreshToken().subscribe(
      () => null,
      error => null
    );
    this.deleteAccountFromLocalStorage();
    this.tokenService.deleteTokensFromStorage();
  }

  private static verifyCredentials(credentials: UsernamePasswordCredentials): boolean {
    let regExp: RegExp = /^[\w!@#$%\^&*()\-\\.|\/?><;':"+=~`{}\[\],]+$/i;

    return regExp.test(credentials.username) && regExp.test(credentials.password);
  }

  private createAccountFromJson(user: any): Account {
    let account: Account = new Account(
      user.ldapId,
      user.fullName,
      user.email,
      this.tokenService.authorities
    );
    localStorage.setItem(this.STORAGE_KEY, account.toString());
    return account;
  }

  public getAccount(): Account {
    return new Account(JSON.parse(localStorage.getItem(this.STORAGE_KEY)));
  }

  private deleteAccountFromLocalStorage(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.account = null;
  }

  public getRoutes(): Array<string> {
    let route = [];
    this.getAccount().authorities.forEach(a=>route = routes[a.authority]?route.concat(routes[a.authority]):route);
    //noinspection TypeScriptUnresolvedFunction
    return Array.from(new Set(route));
  }
}
