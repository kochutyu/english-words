import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { DropDownMenuService } from 'src/app/shared/services/drop-down-menu.service';
import { trigger, state, style, animation, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('settings', [
      state('click-active', style({
        'transform': 'rotate(180deg)'
      })),
      state('click-no-active', style({
        'transform': 'rotate(0deg)'
      })),
      transition('* <=> *', animate('500ms ease-out'))
    ])
  ]
})
export class NavbarComponent implements OnInit {

  constructor(
    public modal: ModalService,
    public userS: UsersService,
    public menu: DropDownMenuService
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
