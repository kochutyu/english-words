import { Component, OnInit } from '@angular/core';
import { ModalService } from './shared/services/modal.service';
import { UsersService } from './shared/services/users.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'english-words';
  name = 'NGX-UI-LOADER';
  constructor(
    public modal: ModalService,
    private userS: UsersService,
    private router: Router,
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) { }
  ngOnInit(): void {
    if (sessionStorage.getItem('user')) {
      this.userS.user = JSON.parse(sessionStorage.getItem('user'));
      this.userS.loginStatus = true;
      this.userS.wrongNickNameOrPassword = false;
      this.router.navigate(['/learn-new-words']);
      this.userS.updateDataUserFromStorage();
    }

    this.ngxLoader.start(); // start master loader
    // this.http.request().
    this.ngxLoader.stop();

  }
}
