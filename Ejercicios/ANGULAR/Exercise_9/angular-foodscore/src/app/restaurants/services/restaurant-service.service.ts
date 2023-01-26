import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { RestaurantResponse, RestaurantsResponse } from '../interfaces/responses';
import { Restaurant } from '../interfaces/restaurant';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  private readonly RESTAURANTS_URL = 'restaurants';

  constructor(private readonly http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<RestaurantsResponse>(this.RESTAURANTS_URL).pipe(
      map((r) => r.restaurants),
      catchError((resp: HttpErrorResponse) =>
        throwError(
          () =>
            `Error getting products. Status: ${resp.status}. Message: ${resp.message}`
        )
      )
    );
  }

  getRestaurant(id: number): Observable<Restaurant> {
    return this.http.get<RestaurantResponse>(`${this.RESTAURANTS_URL}/${id}`).pipe(
      map((r) => r.restaurant)
    );
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http
      .post<RestaurantResponse>(this.RESTAURANTS_URL, restaurant)
      .pipe(map((resp) => resp.restaurant));
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.RESTAURANTS_URL}/${id}`);
  }
}
