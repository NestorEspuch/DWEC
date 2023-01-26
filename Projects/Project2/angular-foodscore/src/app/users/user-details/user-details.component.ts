import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../interfaces/user';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Restaurant } from 'src/app/restaurants/interfaces/restaurant';
import { RestaurantCardComponent } from '../../restaurants/restaurant-card/restaurant-card.component';
import { RestaurantsService } from 'src/app/restaurants/services/restaurant-service.service';
import { UsersService } from '../services/user-service.service';

@Component({
  selector: 'fs-user-details',
  standalone: true,
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  imports: [CommonModule, RouterModule, RestaurantCardComponent],
})
export class UserDetailsComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly restaurantServices: RestaurantsService,
    private readonly userServices: UsersService,
  ) {}

  user!: User;
  restaurants!: Restaurant[];

  ngOnInit(): void {
    this.route.data.subscribe((user) => {
      if(user['user']){
        this.user = user['user'];
      }else{
        this.userServices.getUser(0,true).subscribe(u => this.user = u);
      }
    });
  }
}
