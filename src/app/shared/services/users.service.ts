import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loginStatus: boolean = false;
  emailIsBusy: boolean = false;
  wrongEmailOrPassword: boolean = false;
  user: IUser;
  users: IUser[] = [];

  constructor() { 
    this.users = []
  }
}
