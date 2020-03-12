import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @ViewChild('exit', { static: true }) exit: ElementRef; // close modal

  constructor(
    private r: Renderer2,
    private el: ElementRef,
    public app: AppService,
    public modal: ModalService
  ) { }



  ngOnInit(): void {
  }
  lol: any;
  hide(): void {
    this.r.setStyle(this.exit.nativeElement, 'animation-name', 'close')
    this.r.setStyle(this.exit.nativeElement, 'animation-duration', '0.5s')
    
    setTimeout(() => {
      this.r.setStyle(this.exit.nativeElement, 'display', 'none')
      this.modal.modal = false;
    }, 300);
  }

}
