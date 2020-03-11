import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public modal: ModalService
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
