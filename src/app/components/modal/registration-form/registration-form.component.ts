import { Component, OnInit, HostListener, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { MyValidators } from 'src/app/shared/my.validators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private r: Renderer2,
    private el: ElementRef,
    public app: AppService,
    public modal: ModalService
  ) {

  }

  @ViewChild('exit', { static: true }) exit: ElementRef;
  @ViewChild('btn', { static: true }) btn: ElementRef;

  @HostListener('blur', ['$event.target']) remove(event: Event) {
    // this.r.setStyle(this.exit.nativeElement, 'display', 'none')
  }


  ngOnInit(): void {
    if (this.modal.registrationStatus) {
      this.SIGNIN()
    } else {
      this.LOGIN()
    }
  }

  LOGIN(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, MyValidators.checkEmail]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  SIGNIN(): void {
    this.form = new FormGroup({
      firstName: new FormControl('', [Validators.required, MyValidators.checkFirstSymbol]),
      lastName: new FormControl('', [Validators.required, MyValidators.checkFirstSymbol]),
      email: new FormControl('', [Validators.required, MyValidators.checkEmail]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  focus(): void {
    // console.log('new focus');
    // console.log(this.form.get('email').value.length>0);
    

  }

  submit(): void {
    console.log(this.form.value);
    this.form.reset();
  }

  signIn(): void {
    this.modal.registrationStatus = true;
    this.SIGNIN();
  }


  logIn(): void {
    this.modal.registrationStatus = false;
    this.LOGIN();
  }

}
