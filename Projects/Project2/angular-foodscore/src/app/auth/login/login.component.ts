import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../services/auth-service.service';
import { UserLogin } from 'src/app/users/interfaces/user';
import { SearchResult } from 'src/app/maps/interfaces/search-result';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoogleLoginDirective } from './google-login/google-login.directive';
import { FbLoginDirective } from './facebook-login/fb-login.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'fs-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoogleLoginDirective,
    FbLoginDirective,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  newAuth: UserLogin = {
    email: '',
    password: '',
  };

  formAuth!: FormGroup;
  emailControl!: FormControl<string>;
  passwordControl!: FormControl<string>;

  googleIcon = faGoogle;
  fbIcon = faFacebook;

  constructor(
    private readonly titleService: Title,
    private readonly authService: AuthService,
    private readonly router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login | Angular Restaurants');

    this.emailControl = this.fb.control('', [Validators.required]);

    this.passwordControl = this.fb.control('', [Validators.required]);

    this.formAuth = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl,
    });

    navigator.geolocation.getCurrentPosition((pos) => {
      this.newAuth.lat = pos.coords.latitude;
      this.newAuth.lng = pos.coords.longitude;
    });
  }

  loginUser() {
    this.newAuth.email = this.emailControl.value;
    this.newAuth.password = this.passwordControl.value;

    this.authService.login(this.newAuth).subscribe({
      next: () => {
        this.router.navigate(['/restaurant']);
      },
      error: () =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Incorrect username or password',
          footer: 'Try logging in with another user or password',
        }),
    });
  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }

  loggedGoogle(user: gapi.auth2.GoogleUser): void {
    this.newAuth.token = user.getAuthResponse().id_token;
    console.log(this.newAuth, user.getAuthResponse().id_token);

    this.authService.loginGoogle(this.newAuth).subscribe({
      next: () => this.router.navigate(['/restaurant']),
    });
  }

  loggedFacebook(resp: fb.StatusResponse): void {
    this.newAuth.token = resp.authResponse.accessToken;
    this.newAuth.userId = resp.authResponse.userID;
    this.authService.loginFaceebok(this.newAuth).subscribe({
      next: () => this.router.navigate(['/restaurant']),
    });
  }

  searchResult(result: SearchResult) {
    this.newAuth.lat = result.latitude;
    this.newAuth.lng = result.longitude;
  }
}
