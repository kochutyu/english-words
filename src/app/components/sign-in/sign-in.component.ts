import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private r: Renderer2,
    private el: ElementRef
  ) { }

  @ViewChild('exit', { static: true }) exit: ElementRef;
  @ViewChild('btn', {static: true}) btn: ElementRef;

  @HostListener('blur', ['$event.target']) remove(event: Event){
    // this.r.setStyle(this.exit.nativeElement, 'display', 'none')
    alert()
  }
  
  
  ngOnInit(): void {
    console.log(this.exit.nativeElement);
    
  }
  
  
  
  hide(): void {
    // this.exit.nativeElement.
    this.r.setStyle(this.exit.nativeElement, 'animation-name', 'close')
    this.r.setStyle(this.exit.nativeElement, 'animation-duration', '1s')
    setTimeout(() => {
      
      this.r.setStyle(this.exit.nativeElement, 'display', 'none')
    }, 900);
  }

  focus(): void{
  }

}
