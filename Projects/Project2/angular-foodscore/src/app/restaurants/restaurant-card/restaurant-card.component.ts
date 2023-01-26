import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Restaurant } from '../interfaces/restaurant';
import { FormsModule } from '@angular/forms';
import { RestaurantsService } from '../services/restaurant-service.service';
import { Router, RouterModule } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'fs-restaurant-card',
  standalone: true,
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, StarRatingComponent],
})
export class RestaurantCardComponent {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly router: Router
  ) {}

  readonly days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  @Input() restaurant!: Restaurant;
  @Output() deleted = new EventEmitter<void>();

  checkOpening(daysOpen: string[]): boolean {
    let opened = false;
    daysOpen.forEach((d) => {
      if (d === new Date().getDay().toString()) {
        opened = true;
      }
    });
    return opened;
  }

  fillDays(daysOpen: string[]): string {
    let result = '';
    daysOpen.forEach((day) => {
      switch (day) {
        case '0':
        case 'Su':
        case 'Sun':
          result += 'Su,';
          break;
        case '1':
        case 'Mo':
        case 'Mon':
          result += 'Mo,';
          break;
        case '2':
        case 'Tu':
        case 'tue':
          result += 'Tu,';
          break;
        case '3':
        case 'We':
        case 'Wed':
          result += 'We,';
          break;
        case '4':
        case 'Th':
        case 'Thu':
          result += 'Th,';
          break;
        case '5':
        case 'Fr':
        case 'Fri':
          result += 'Fr,';
          break;
        case '6':
        case 'Sa':
        case 'Sat':
          result += 'Sa,';
          break;
      }
    });
    return result.substring(0, result.length - 1);
  }

  deleteRestaurant(): void {
    Swal.fire({
      title: 'Do you want to delete the restaurant?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!', 'Your restaurant has been deleted.', 'success');
        this.restaurantsService
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .deleteRestaurant(this.restaurant.id!)
          .subscribe({
            next: () => {
              this.deleted.emit();
              this.router.navigate(['/restaurant']);
            },
            error: (e) =>
              Swal.fire('The restaurant has not been eliminated', '', e),
          });
      } else if (result.isDenied) {
        Swal.fire('The restaurant has not been eliminated', '', 'info');
      }
    });
  }
}
