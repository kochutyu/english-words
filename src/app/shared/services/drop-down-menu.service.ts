import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropDownMenuService {
  openStatusMenu: boolean = false;
  constructor() { }
}
