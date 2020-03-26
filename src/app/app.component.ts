import { Component, OnInit } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { UsersService } from './shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'english-words';
  constructor(
    public modal: ModalService,
    private userS: UsersService,
    private router: Router
  ){}
  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.userS.user = JSON.parse(sessionStorage.getItem('user'));
      this.userS.loginStatus = true;
      this.userS.wrongNickNameOrPassword = false;
      this.router.navigate(['/learn-new-words']);
      this.userS.updateDataUserFromStorage();
    }
  }
}
