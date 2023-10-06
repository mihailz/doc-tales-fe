import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {LoginFormModel} from "../../../model/login-form.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showError = false;
  hide = true;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  ngOnDestroy(): void {
  }

  private initLoginForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  getFControl(path: string): FormControl {
    return this.loginForm.get(path) as FormControl;
  }

  getFControlErrorMessage(path: string): string {
    if (this.loginForm.get(path)?.hasError('email')) {
      return 'Email is invalid!';
    }
    return 'You must enter a value';
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.router.navigate(['/platform']);
  }
}
