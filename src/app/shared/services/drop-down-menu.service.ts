import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DropDownMenuService {
  openStatusMenu: boolean = false;
  menuState: string = 'end'
  rotadeSettings: string = 'click-active'

  constructor(
    private user: UsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  onRotadeSettings(): void {
    this.rotadeSettings = this.rotadeSettings === 'click-active' ? 'click-no-active' : 'click-active';
  }

  toggle(): void {
    this.onRotadeSettings();
    this.openStatusMenu = !this.openStatusMenu;
    this.menuState = this.menuState === 'end' ? 'start' : 'end';
  }

  logOut(): void {
    delete this.user.user;
    this.user.loginStatus = false;
    this.router.navigate(['/home']);
    this.toggle();
  }
}
