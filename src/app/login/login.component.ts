import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean;
  error: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {}

  ngOnInit() {
    this.submitted = false;
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get form() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    this.error = '';

    if (this.loginForm.invalid) { return; }

    this.authenticationService.login(this.form.username.value, this.form.password.value).subscribe(() => {
      this.submitted = false;
      this.router.navigate(['master']);
    },
    (resp: HttpErrorResponse) => {
      this.submitted = false;
      this.error = resp.statusText;
    });
  }
}
