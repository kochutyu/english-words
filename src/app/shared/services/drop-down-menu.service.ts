import { Injectable, ElementRef, Renderer2 } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DropDownMenuService {
  openStatusMenu: boolean = false;
  menuState: string = 'end'
  rotadeSettings: string = 'click-active'
  dropDown: ElementRef

  constructor(
    private user: UsersService,
    private router: Router,
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
}
