import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RestaurantsService } from '../services/restaurant-service.service';
import { Router } from '@angular/router';
import { CanDeactivateComponent } from 'src/app/guards/leave-page-guard.guard';
import { oneChecked } from '../validators/minDays.validator';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
})
export class RestaurantFormComponent implements OnInit, CanDeactivateComponent {
  @Output() add = new EventEmitter<Restaurant>();

  newRestaurant: Restaurant = {
    name: "",
    image: "",
    cuisine: "",
    description: "",
    phone: "",
    daysOpen: [],
  };
  imageName = '';
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  saved = false;
  formRestaurant!: FormGroup;
  nameControl!: FormControl<string>;
  descriptionControl!: FormControl<string>;
  cuisineControl!: FormControl<string>;
  daysControl!: FormArray;
  phoneControl!: FormControl<string>;
  imageControl!: FormControl<string>;

  constructor(
    private readonly restaurantService: RestaurantsService,
    private readonly router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.nameControl = this.fb.control('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z][a-zA-Z ]*$'),
    ]);

    this.descriptionControl = this.fb.control('', [
      Validators.required,
    ]);

    this.cuisineControl = this.fb.control('', [
      Validators.required,
    ]);

    this.daysControl = this.fb.array(new Array(7).fill(true), [
      oneChecked(),
    ]);

    this.phoneControl = this.fb.control('', [
      Validators.required,
      Validators.pattern('([+0]?[0-9]{2} ?)?[0-9]{9}'),
    ]);

    this.imageControl = this.fb.control('', [Validators.required]);

    this.formRestaurant = this.fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      cuisine: this.cuisineControl,
      days: this.daysControl,
      phone: this.phoneControl,
      image: this.imageControl,
    });
  }

  canDeactivate() {
    return (
      this.saved ||
      this.formRestaurant.pristine ||
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
      this.newRestaurant.image = reader.result as string;
    });
  }

  fillDays(daysOpen: boolean[]): string[] {
    const result: string[] = [];
    for (let i = 0; i < daysOpen.length; i++) {
      if (daysOpen[i]) {
        result.push(i.toString());
      }
    }
    return result;
  }

  addRestaurant() {
    this.newRestaurant.name = this.nameControl.value;
    this.newRestaurant.description = this.descriptionControl.value;
    this.newRestaurant.cuisine = this.cuisineControl.value;
    this.newRestaurant.daysOpen = this.fillDays(this.daysControl.value);
    this.newRestaurant.phone = this.phoneControl.value;

    this.restaurantService.addRestaurant(this.newRestaurant).subscribe({
      next: () => {
        this.saved = true;
        this.imageName = '';
        this.router.navigate(['/restaurant']);
      },
      error: (e) => console.error(e),
    });
  }

  validClasses(control: FormControl | FormArray, validClass: string, errorClass: string) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }
}
