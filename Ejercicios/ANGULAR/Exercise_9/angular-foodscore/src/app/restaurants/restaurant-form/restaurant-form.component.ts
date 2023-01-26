import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantsService } from '../services/restaurant-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'fs-restaurant-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent{

  @Output () add = new EventEmitter<Restaurant>();

  newRestaurant!: Restaurant;
  imageName = "";
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOpen: boolean[] = new Array(7);

  constructor(private readonly restaurantService: RestaurantsService, private readonly router: Router) {
    this.resetRestaurant();
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

  fillDays(daysOpen: boolean[]): string[]{
    const result: string[] = [];
    for(let i = 0; i < daysOpen.length; i++){
      if(daysOpen[i]){
        result.push(i.toString());
      }
    }
    return result;
  }

  addRestaurant() {
    this.newRestaurant.daysOpen = this.fillDays(this.daysOpen);
    this.restaurantService.addRestaurant(this.newRestaurant).subscribe({
      next: () => {
        this.imageName = "";
        this.router.navigate(['/restaurant']);
      },
      error: (e) => console.error(e),
    });

  }

  private resetRestaurant() {
    this.newRestaurant = {
      name: "",
      image: "",
      cuisine: "",
      description: "",
      phone: "",
      daysOpen: []
    };
  }
}
