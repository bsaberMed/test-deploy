import { Component } from '@angular/core';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user: User;
  constructor(private accountService: AccountService) {
  }

  logout(){
    this.accountService.logout();
  }
}
