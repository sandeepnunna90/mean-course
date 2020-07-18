import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListnerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // note - we need to set it in header component like this for the same reason
    // we had do it in post list component - see Lecture 112 -> timer: 12:00
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListnerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout(): void {
    this.authService.logout();
  }

  // when creating a subscription manually, we will have to usubscribe it
  // this is not applicabale to httpModule for services as the module handles it
  ngOnDestroy(): void {
    this.authListnerSubs.unsubscribe();
  }
}
