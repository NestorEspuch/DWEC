import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantFilterPipe } from '../pipes/restaurant-filter.pipe';

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

  constructor() {
    this.resetRestaurant();
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', (e) => {
      this.newRestaurant.image = reader.result as string;
    });
  }

  addRestaurant() {
    this.newRestaurant.daysOpen = this.fillDays(this.daysOpen, this.days);
    this.add.emit(this.newRestaurant);
    this.imageName = "";
    this.resetRestaurant();
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

  fillDays(daysOpen: boolean[], days: string[]): string[] {
    let result: string[] = [];
    for (let i = 0; i < daysOpen.length; i++) {
      if (daysOpen[i]) {
        result.push(days[i].substring(0, 2));
      }
    }
    return result;
  }
}
