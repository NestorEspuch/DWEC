import { Routes } from "@angular/router";
import { leavePageGuard } from "../guards/leave-page-guard.guard";
import { restaurantResolver } from "./resolvers/restaurant-resolver.resolver";
import { RestaurantDetailsComponent } from "./restaurant-details/restaurant-details.component";
import { RestaurantFormComponent } from "./restaurant-form/restaurant-form.component";
import { RestaurantsPageComponent } from "./restaurants-page/restaurants-page.component";

export const routes: Routes = [
  { path: '', component: RestaurantsPageComponent, canDeactivate:[leavePageGuard] },
  // :id is a parameter (product's id)
  { path: 'add', component: RestaurantFormComponent },
  { path: ':id', component: RestaurantDetailsComponent, resolve: {restaurant: restaurantResolver} }
]
