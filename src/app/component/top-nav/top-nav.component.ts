import {
  Component,
  OnInit
} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {Router} from "@angular/router";
import {Account} from "../../entity/account";

@Component({
  selector: 'top-nav',
  templateUrl: 'top-nav.component.html',
  styleUrls: ['top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit() {
    this.account = this.accountService.getAccount()
  }

  logout(): void {
    this.accountService.logout();
    this.router.navigate(['/login']);
  }
}
