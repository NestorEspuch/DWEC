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
import { ActivatedRoute, Router } from '@angular/router';
import { CanDeactivateComponent } from 'src/app/guards/leave-page-guard.guard';
import { oneChecked } from '../validators/minDays.validator';
import { SearchResult } from 'src/app/maps/interfaces/search-result';
import { ArcgisMapComponent } from '../../maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from '../../maps/arcgis-marker/arcgis-marker.directive';
import { ArcgisSearchDirective } from '../../maps/arcgis-search/arcgis-search.directive';
import Swal from 'sweetalert2';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ArcgisMapComponent,
    ArcgisMarkerDirective,
    ArcgisSearchDirective,
  ],
})
export class RestaurantFormComponent implements OnInit, CanDeactivateComponent {
  @Output() add = new EventEmitter<Restaurant>();

  editing = false;
  restaurant!: Restaurant;
  restaurantAdress = 'Select a location:';

  newRestaurant: Restaurant = {
    name: '',
    image: '',
    cuisine: '',
    description: '',
    phone: '',
    daysOpen: [],
    lat: 0,
    lng: 0,
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
    private fb: NonNullableFormBuilder,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((restaurant) => {
      if (restaurant['restaurant']) {
        this.restaurant = restaurant['restaurant'];
        this.editing = true;
      }
    });

    if (this.editing) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.restaurantAdress = this.restaurant.address!;

      this.nameControl = this.fb.control(this.restaurant.name, [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z ]*$'),
      ]);

      this.descriptionControl = this.fb.control(this.restaurant.description, [
        Validators.required,
      ]);

      this.cuisineControl = this.fb.control(this.restaurant.cuisine, [
        Validators.required,
      ]);

      this.daysControl = this.fb.array(
        this.changeToBolean(this.restaurant.daysOpen),
        [oneChecked()]
      );

      this.phoneControl = this.fb.control(this.restaurant.phone, [
        Validators.required,
        Validators.pattern('([+0]?[0-9]{2} ?)?[0-9]{9}'),
      ]);

      this.imageControl = this.fb.control('', [Validators.required]);
    }

    if (!this.editing) {
      this.nameControl = this.fb.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z][a-zA-Z ]*$'),
      ]);

      this.descriptionControl = this.fb.control('', [Validators.required]);

      this.cuisineControl = this.fb.control('', [Validators.required]);

      this.daysControl = this.fb.array(, [oneChecked()]);

      this.phoneControl = this.fb.control('', [
        Validators.required,
        Validators.pattern('([+0]?[0-9]{2} ?)?[0-9]{9}'),
      ]);

      this.imageControl = this.fb.control('', [Validators.required]);
    }

    this.formRestaurant = this.fb.group({
      name: this.nameControl,
      description: this.descriptionControl,
      cuisine: this.cuisineControl,
      days: this.daysControl,
      phone: this.phoneControl,
      image: this.imageControl,
    });

    navigator.geolocation.getCurrentPosition((pos) => {
      this.newRestaurant.lat = pos.coords.latitude;
      this.newRestaurant.lng = pos.coords.longitude;

      if (this.editing) {
        this.restaurant.lat = pos.coords.latitude;
        this.restaurant.lng = pos.coords.longitude;
      }
    });
  }

  canDeactivate() {
    if (this.saved || this.formRestaurant.pristine) {
      return true;
    } else {
      return Swal.fire({
        title: 'Do you want to leave this page?',
        showDenyButton: true,
        confirmButtonText: 'Exit',
        denyButtonText: "Don't exit",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Changes have not been saved', '', 'info');
          return true;
        } else {
          return false;
        }
      });
    }
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
    this.newRestaurant.address = this.restaurantAdress;

    if (!this.newRestaurant.image)
      this.newRestaurant.image = this.restaurant.image;

    if (!this.editing) {
      this.restaurantService.addRestaurant(this.newRestaurant).subscribe({
        next: () => {
          this.saved = true;
          this.imageName = '';
          this.router.navigate(['/restaurant']);
        },
        error: (e) => console.error(e),
      });
    } else {
      Swal.fire({
        title: 'Do you want to edit this restaurant?',
        text: 'You won be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, edit it!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.restaurantService
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            .editRestaurant(this.restaurant.id!, this.newRestaurant)
            .subscribe({
              next: () => {
                this.saved = true;
                this.imageName = '';
                this.router.navigate(['/restaurant', this.restaurant.id]);
              },
              error: (e) => console.error(e),
            });
        } else if (result.isDenied) {
          Swal.fire('The restaurant has not been edited', '', 'info');
        }
      });
    }
  }

  validClasses(
    control: FormControl | FormArray,
    validClass: string,
    errorClass: string
  ) {
    return {
      [validClass]: control.touched && control.valid,
      [errorClass]: control.touched && control.invalid,
    };
  }

  searchResult(result: SearchResult) {
    this.newRestaurant.lat = result.latitude;
    this.newRestaurant.lng = result.longitude;

    this.restaurantAdress = result.address;
    this.restaurant.address = this.restaurantAdress;
  }

  changeToBolean(daysOpen: string[]): boolean[] {
    const result = new Array(7).fill(false);
    daysOpen.forEach((d) => {
      switch (d) {
        case '0':
          result[0] = true;
          break;
        case '1':
          result[1] = true;
          break;
        case '2':
          result[2] = true;
          break;
        case '3':
          result[3] = true;
          break;
        case '4':
          result[4] = true;
          break;
        case '5':
          result[5] = true;
          break;
        case '6':
          result[6] = true;
          break;
      }
    });
    return result;
  }
}
