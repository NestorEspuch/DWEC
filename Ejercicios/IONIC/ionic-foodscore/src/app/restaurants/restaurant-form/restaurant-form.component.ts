import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormArray, FormControl, FormsModule } from '@angular/forms';
import { RestaurantsService } from '../services/restaurant-service.service';
import { Router, RouterLink } from '@angular/router';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { Camera, CameraSource, CameraResultType } from '@capacitor/camera';
import { ArcgisMapComponent } from 'src/app/maps/arcgis-map/arcgis-map.component';
import { ArcgisMarkerDirective } from 'src/app/maps/arcgis-marker/arcgis-marker.directive';
import { SearchResult } from 'src/app/maps/interfaces/search-result';
import { ArcgisSearchDirective } from 'src/app/maps/arcgis-search/arcgis-search.directive';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css'],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    FormsModule,
    IonicModule,
    ArcgisMapComponent,
    ArcgisMarkerDirective,
    ArcgisSearchDirective,
  ],
})
export class RestaurantFormComponent implements OnInit {
  @Output() add = new EventEmitter<Restaurant>();

  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  newRestaurant: Restaurant = {
    name: '',
    image: '',
    cuisine: '',
    description: '',
    phone: '',
    daysOpen: [],
    lat: 0,
    lng: 0,
    address: 'Select a location:',
  };

  constructor(
    private readonly restaurantService: RestaurantsService,
    private readonly router: Router,
    private toastCtrl: ToastController,
    private nav: NavController
  ) {}

  async ngOnInit() {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });
    this.newRestaurant.lat = coordinates.coords.latitude;
    this.newRestaurant.lng = coordinates.coords.longitude;
  }

  async takePhoto() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Camera,
      quality: 90,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.newRestaurant.image = photo.dataUrl as string;
  }

  async pickFromGallery() {
    const photo = await Camera.getPhoto({
      source: CameraSource.Photos,
      height: 640,
      width: 640,
      // allowEditing: true,
      resultType: CameraResultType.DataUrl, // Base64 (url encoded)
    });

    this.newRestaurant.image = photo.dataUrl as string;
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
    this.restaurantService.addRestaurant(this.newRestaurant).subscribe(
      async (prod) => {
        (
          await this.toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Restaurant added succesfully',
            color: 'success',
          })
        ).present();
        this.nav.navigateRoot(['/restaurants']);
      },
      async (error) =>
        (
          await this.toastCtrl.create({
            position: 'bottom',
            duration: 3000,
            message: 'Error adding restaurant',
          })
        ).present()
    );
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

  searchResult(result: SearchResult) {
    this.newRestaurant.lat = result.latitude;
    this.newRestaurant.lng = result.longitude;

    this.newRestaurant.address = result.address;
  }
}
