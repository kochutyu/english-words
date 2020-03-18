import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropDownMenuService {
  openStatusMenu: boolean = false;
  menuState: string = 'end'
  rotadeSettings: string = 'click-active'
  
  constructor() { }
  
  ngOnInit(): void {
  }
  onRotadeSettings(): void {
    this.rotadeSettings = this.rotadeSettings === 'click-active' ? 'click-no-active' : 'click-active';
  }

  toggle(): void {
    // this.onRotadeSettings();
    this.openStatusMenu = !this.openStatusMenu;
    this.menuState = this.menuState === 'end' ? 'start' : 'end';
  }
}
