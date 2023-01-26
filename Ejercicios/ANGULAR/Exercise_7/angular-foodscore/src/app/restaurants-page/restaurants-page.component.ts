import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fs-restaurants-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurants-page.component.html',
  styleUrls: ['./restaurants-page.component.css'],
})
export class RestaurantsPageComponent {
  constructor() {}
  restaurants: Restaurant[] = [
    {
      name: 'Juan',
      image:
      cuisine: 'Juan',
      description: 'Juan',
      phone: '692143617',
      daysOpen: ['Mo', 'Fr'],
    },
  ];
  newRestaurant: Restaurant = {
    name: '',
    image: '',
    cuisine: '',
    description: '',
    phone: '',
    daysOpen: [],
  };
  imageName = '';
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOpen: boolean[] = new Array(7);

  fillDays(daysOpen: boolean[], days: string[]): string[] {
    let result: string[] = [];
    for (let i = 0; i < daysOpen.length; i++) {
      if (daysOpen[i]) {
        result.push(days[i].substring(0, 2));
      }
    }
    return result;
  }

  checkOpening(daysOpen: string[]): boolean {
    let opened = false;
    for (let i = 0; i < this.days.length; i++) {
      daysOpen.forEach((d) => {
        if (d == this.days[i].substring(0, 2)
        && i === new Date().getDay()) {
          opened = true;
        }
      });
    }
    return opened;
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
    this.restaurants.push(this.newRestaurant);
    this.newRestaurant = {
      name: '',
      image: '',
      cuisine: '',
      description: '',
      phone: '',
      daysOpen: [],
    };
  }
}