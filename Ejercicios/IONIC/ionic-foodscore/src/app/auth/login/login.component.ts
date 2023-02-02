import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import {
  AlertController,
  IonicModule,
  NavController,
  Platform,
} from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  firebaseToken = '';

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    if (this.platform.is('capacitor')) {
      PushNotifications.register();

      // On success, we should be able to receive notifications
      PushNotifications.addListener('registration', (token: Token) => {
        this.firebaseToken = token.value;
        console.log(token);
      });

      PushNotifications.addListener('registrationError', (error) => {
        console.log(error);
      });
    }
  }

  login() {
    this.authService
      .login(this.email, this.password, this.firebaseToken)
      .subscribe({
        next: () => this.navCtrl.navigateRoot(['/products']),
        error: async (error) => {
          (
            await this.alertCtrl.create({
              header: 'Login error',
              message: 'Incorrect email and/or password',
              buttons: ['Ok'],
            })
          ).present();
        },
      });
  }
}
