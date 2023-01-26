import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'fs-restaurant-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css']
})
export class RestaurantCardComponent{
  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  @Input () restaurant!: Restaurant;
  @Output () deleted = new EventEmitter<void>();

  constructor() { }

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

  deleteRestaurant(): void {
    this.deleted.emit();
  }
}
