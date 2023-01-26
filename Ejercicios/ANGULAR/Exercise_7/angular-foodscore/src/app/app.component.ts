import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RestaurantsPageComponent } from "./restaurants-page/restaurants-page.component";

@Component({
    selector: 'fs-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RestaurantsPageComponent]
})
export class AppComponent {
  title = 'angular-foodscore';
}
