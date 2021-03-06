import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, transition, animate, group, query, animateChild } from '@angular/animations';
import { DropDownMenuService } from 'src/app/shared/services/drop-down-menu.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drop-down-menu',
  templateUrl: './drop-down-menu.component.html',
  styleUrls: ['./drop-down-menu.component.scss'],
  animations: [
    trigger('menu-ul', [
      state('start', style({
        height: '250px',
      })),
      state('end', style({
        height: '50px',
      })),
      transition('* <=> *', [
        group([
          query('@li-1', animateChild()),
          query('@li-2', animateChild()),
          query('@li-3', animateChild()),
          query('@li-4', animateChild()),
          query('@li-5', animateChild()),
          animate('500ms ease-out'),
        ]),
      ])
    ]),
    trigger('li-1', [
      state('start', style({
        position: 'relative',
        'z-index': '5',
        top: '0',
      })),
      state('end', style({
        position: 'relative',
        'z-index': '5',
      })),
      transition('* <=> *', animate('100ms 400ms ease-out'))
    ]),
    trigger('li-2', [
      state('start', style({
        position: 'relative',
        top: '0',
        'z-index': '4'
      })),
      state('end', style({
        position: 'relative',
        'z-index': '4',
        top: '-50px'
      })),
      transition('* <=> *', animate('200ms 300ms ease-out'))
    ]),
    trigger('li-3', [
      state('start', style({
        position: 'relative',
        top: '0',
        'z-index': '3'
      })),
      state('end', style({
        position: 'relative',
        'z-index': '3',
        top: '-100px'
      })),
      transition('* <=> *', animate('300ms 200ms ease-out'))
    ]),
    trigger('li-4', [
      state('start', style({
        position: 'relative',
        top: '0',
        'z-index': '2'
      })),
      state('end', style({
        position: 'relative',
        'z-index': '2',
        top: '-150px'
      })),
      transition('* <=> *', animate('400ms 100ms ease-out'))
    ]),
    trigger('li-5', [
      state('start', style({
        position: 'relative',
        top: '0',
        'z-index': '1'
      })),
      state('end', style({
        position: 'relative',
        'z-index': '1',
        top: '-200px'
      })),
      transition('* <=> *', animate('500ms ease-out'))
    ]),
  ]
})
export class DropDownMenuComponent implements OnInit {
  percentWidth: string;
  @ViewChild('progress', { static: true }) progress: ElementRef;
  @ViewChild('progressLine', { static: true }) progressLine: ElementRef;
  @ViewChild('dropDown', { static: true }) dropDown: ElementRef;

  constructor(
    public menu: DropDownMenuService,
    public userS: UsersService,
    public r: Renderer2,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.r.setStyle(this.progress.nativeElement, 'width', `${this.userS.getProgressLearnewWords()}%`)
    this.userS.progress = this.progress;
    this.userS.progressLine = this.progressLine;
  }

  logOut(): void {
    delete this.userS.user;
    this.userS.loginStatus = false;
    this.router.navigate(['/home']);
    sessionStorage.setItem('logIn', JSON.stringify(false));
    this.menu.toggle();
    this.hideMunuStart();
  }

  hideMunuStart(): void {
    this.menu.menuState = 'end';
    this.r.setStyle(this.dropDown.nativeElement, 'height', '50px');
  }

}
