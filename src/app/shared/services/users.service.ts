import { Injectable } from '@angular/core';
import { IUser } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  loginStatus: boolean = false;
  nickNameIsBusy: boolean = false;
  wrongNickNameOrPassword: boolean = false;
  user: IUser;
  users: IUser[] = [];

  constructor() { 
    this.users = []
  }
}
