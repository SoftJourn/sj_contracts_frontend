import {Injectable} from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import {Observable} from "rxjs/Rx";
import {AccountService} from "./shared/";

export const routingGuardMap: {[key: string]: RegExp;} = {
  "ROLE_USER": new RegExp("^/contracts")
};

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private accountService: AccountService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    let account = this.accountService.getAccount();
    if (account && account.authorities) {
      return account.authorities.some(a => routingGuardMap[a.authority] ? routingGuardMap[a.authority].test(state.url) : false);
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
