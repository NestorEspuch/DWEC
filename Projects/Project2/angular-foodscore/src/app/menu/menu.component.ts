import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'fs-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly authServices: AuthService
  ) {}

  loggedIn!: boolean;

  ngOnInit(): void {
    this.authServices.loginChange$.subscribe((t) => (this.loggedIn = t));
  }

  logout(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'If you log out, you will no longer be able to see any restaurants!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, sign out!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authServices.logout();
        Swal.fire('You are no longer logged in!');
      }
    });
  }
}
