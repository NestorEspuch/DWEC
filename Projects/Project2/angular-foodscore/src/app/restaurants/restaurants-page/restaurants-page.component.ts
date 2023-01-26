import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RestaurantFormComponent } from '../restaurant-form/restaurant-form.component';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { Restaurant } from '../interfaces/restaurant';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';
import { RestaurantsService } from '../services/restaurant-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/users/interfaces/user';
import { UsersService } from 'src/app/users/services/user-service.service';

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
export class RestaurantsPageComponent implements OnInit {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly route: ActivatedRoute,
    private readonly userService: UsersService
  ) {}

  restaurants: Restaurant[] = [];
  user!: User;
  userRestaurants!: boolean;
  toSearch = '';
  active = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['creator']) {
        this.userService
          .getUser(+params['creator'])
          .subscribe((u) => (this.user = u));
        this.restaurantsService.getRestaurants().subscribe(
          (restaurant) =>
            (this.restaurants = restaurant.filter((r) => {
              if (r.mine) {
                return r.creator?.id == params['creator'];
              } else {
                return r.creator == params['creator'];
              }
            }))
        );
        this.userRestaurants = true;
      } else {
        this.restaurantsService
          .getRestaurants()
          .subscribe((restaurant) => (this.restaurants = restaurant));

        this.userRestaurants = false;
      }
    });
  }

  saveRestaurant(restaurant: Restaurant): void {
    this.restaurants = [...this.restaurants, restaurant];
  }

  deleteRestaurant(restaurant: Restaurant): void {
    this.restaurants = this.restaurants.filter((r) => r !== restaurant);
  }

  setActive() {
    if (this.active) {
      this.active = false;
    } else {
      this.active = true;
    }
  }
}
