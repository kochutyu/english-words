import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public userS: UsersService
  ) { }

  ngOnInit(): void {
  }

  signIn(): void{
    this.modal.modal = true;
    this.modal.registrationFormStatus = true;
    this.modal.registrationStatus = true;
  }

  lognIn(): void{
    this.modal.modal = true;
    this.modal.registrationFormStatus = true;
    this.modal.registrationStatus = false;
  }

}
