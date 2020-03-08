import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Form, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private r: Renderer2,
    private el: ElementRef
  ) { }

  @ViewChild('exit', { static: true }) exit: ElementRef;
  @ViewChild('btn', {static: true}) btn: ElementRef;

  @HostListener('blur', ['$event.target']) remove(event: Event){
    // this.r.setStyle(this.exit.nativeElement, 'display', 'none')
  }
  
  
  ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
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

  submit(): void{
    console.log(this.form.value);
    
  }

}
