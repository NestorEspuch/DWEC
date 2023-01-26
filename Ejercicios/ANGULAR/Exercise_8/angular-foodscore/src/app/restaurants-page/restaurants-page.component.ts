import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';

@Component({
  selector: 'fs-restaurants-page',
  standalone: true,
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    RestaurantFormComponent,
    RestaurantCardComponent,
    RestaurantFilterPipe,
  ],
})
export class RestaurantsPageComponent {
  restaurants: Restaurant[] = [];
  toSearch: string = '';
  active: boolean = true;

  constructor() {}

  saveRestaurant(restaurant: Restaurant): void {
    this.restaurants = [...this.restaurants, restaurant];
  }

  deleteRestaurant(restaurant: Restaurant): void {
    this.restaurants = this.restaurants.filter((r) => r !== restaurant);
  }

  setActive() {
    if(this.active){
      this.active = false;
    }else{
      this.active = true;
    }
  }
}
