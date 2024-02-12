import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { Route } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UsersService } from 'src/app/services/users.service';


export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val)
  }

  menuItems = signal<MenuItem[]>([
    {
      icon: 'account_box',
      label: 'Profile',
      route: 'profile',
    },
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },
    {
      icon: 'analytics',
      label: 'any text',
      route: 'any text',
    },
    {
      icon: 'comment',
      label: 'Chat',
      route: 'chat',
    },
  ]);

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
  constructor(public authService: AuthenticationService, private usersService: UsersService) { }

  ngOnInit(): void {

  }
  get currentUser() {
    return this.authService.currentUser$;
  }
}
