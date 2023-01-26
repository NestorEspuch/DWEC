import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/users/interfaces/user';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/users/services/user-service.service';
import { CanDeactivateComponent } from 'src/app/guards/leave-page-guard.guard';
import { SearchResult } from 'src/app/maps/interfaces/search-result';
import { ArcgisMapComponent } from '../../maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from '../../maps/arcgis-marker/arcgis-marker.directive';
import { ArcgisSearchDirective } from '../../maps/arcgis-search/arcgis-search.directive';
import { AuthService } from '../services/auth-service.service';
import { sameEmail } from 'src/app/shared/validators/sameEmail.validator';

@Component({
  selector: 'fs-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArcgisMapComponent,
    ArcgisMarkerDirective,
    ArcgisSearchDirective,
  ],
})
export class RegisterComponent implements OnInit, CanDeactivateComponent {
  @Output() add = new EventEmitter<User>();

  newUser: User = {
    name: '',
    email: '',
    password: '',
    avatar: '',
    lat: 0,
    lng: 0,
  };

  avatarName = '';
  saved = false;

  formUser!: FormGroup;
  nameControl!: FormControl<string>;
  emailControl!: FormControl<string>;
  email2Control!: FormControl<string>;
  passwordControl!: FormControl<string>;
  avatarControl!: FormControl<string>;

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.nameControl = this.fb.control('', [Validators.required]);

    this.emailControl = this.fb.control('', [Validators.required, Validators.email]);

    this.email2Control = this.fb.control('', [
      Validators.required,
      sameEmail(this.emailControl),
    ]);

    this.passwordControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
    ]);

    this.avatarControl = this.fb.control('', [Validators.required]);

    this.formUser = this.fb.group({
      name: this.nameControl,
      email: this.emailControl,
      email2: this.email2Control,
      password: this.passwordControl,
      avatar: this.avatarControl,
    });

    navigator.geolocation.getCurrentPosition((pos) => {
      this.newUser.lat = pos.coords.latitude;
      this.newUser.lng = pos.coords.longitude;
    });
  }

  canDeactivate() {
    return (
      this.saved ||
      this.formUser.pristine ||
      confirm('Do you want to leave this page?. Changes can be lost')
    );
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newUser.avatar = reader.result as string;
    });
  }

  addUser() {
    this.newUser.name = this.nameControl.value;
    this.newUser.email = this.emailControl.value;
    this.newUser.password = this.passwordControl.value;

    this.authService.register(this.newUser).subscribe({
      next: () => {
        this.saved = true;
        this.avatarName = '';
        this.router.navigate(['/restaurant']);
      },
      error: (e) => console.error(e),
    });
  }

  validClasses(control: FormControl, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }

  searchResult(result: SearchResult) {
    this.newUser.lat = result.latitude;
    this.newUser.lng = result.longitude;
  }
}
