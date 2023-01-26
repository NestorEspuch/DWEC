import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../interfaces/restaurant';

@Component({
  selector: 'fs-restaurant-details',
  standalone: true,
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
  imports: [CommonModule, RestaurantCardComponent],
})
export class RestaurantDetailsComponent implements OnInit {
  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {

  }
  restaurant!: Restaurant;

  goBack() {
    this.router.navigate(['/restaurant']);
  }
  ngOnInit(): void {
    this.route.data.subscribe((restaurant) => {
      this.restaurant = restaurant['restaurant'];
    })
  }
}
