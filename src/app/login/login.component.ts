import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  token: any;
  dataUser: any;
  disableButton: boolean;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.dataUser = this.authService.dataUser();
  }

  ngOnInit() {
    if (this.dataUser) {
      this._router.navigate(['home']);
      return false;
    }

    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.disableButton = true;

    if (this.loginForm.invalid) {
      this.disableButton = false;
      return false;
    }

    const params = {
      email: this.form.email.value,
      password: this.form.password.value,
    };

    this.authService.login(params).subscribe(responseToken => {
      if (responseToken.status === false) {
        Swal.fire('Login', responseToken.message, 'error');
        this.disableButton = false;
        return false;
      }

      this.token = responseToken;

      this.authService.login(params, true).subscribe(responseData => {
        this.dataUser = responseData;
        this.authService.localStorage(this.token, this.dataUser);
        this._router.navigate(['home']);
      });

    });

  }

}
