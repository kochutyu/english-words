import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('exit', { static: true }) exit: ElementRef; // close modal
  @ViewChild('hideModal', { static: true }) hideModal: ElementRef; // close modal

  constructor(
    private r: Renderer2,
    private el: ElementRef,
    public app: AppService,
    public modal: ModalService,
    private location: Location,
    private router: Router
  ) { }



  ngOnInit(): void {
    this.modal.hideModal = this.hideModal;
    
  }
  lol: any;

  closeModal(): void {
    this.r.setStyle(this.hideModal.nativeElement, 'display', 'none');
    this.r.setStyle(this.exit.nativeElement, 'animation-name', 'close')
    this.r.setStyle(this.exit.nativeElement, 'animation-duration', '0.5s')
    // this.location.back();
    this.router.navigate(['/home']);
    setTimeout(() => {
      this.r.setStyle(this.exit.nativeElement, 'display', 'none')
      this.modal.modal = false;
    }, 470);

  }

}
