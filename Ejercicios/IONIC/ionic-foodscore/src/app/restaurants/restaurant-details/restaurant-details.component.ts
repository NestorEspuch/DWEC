// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';
// import { Restaurant } from '../interfaces/restaurant';
// import { RestaurantsService } from '../services/restaurant-service.service';
// import { StarRatingComponent } from '../star-rating/star-rating.component';
// import {
//   FormControl,
//   FormGroup,
//   NonNullableFormBuilder,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { Commentary } from '../interfaces/comment';
// import { ArcgisMarkerDirective } from '../../maps/arcgis-marker/arcgis-marker.directive';
// import { ArcgisMapComponent } from '../../maps/arcgis-map/arcgis-map.component';
// import { UsersService } from 'src/app/users/services/user-service.service';

// @Component({
//   selector: 'fs-restaurant-details',
//   standalone: true,
//   templateUrl: './restaurant-details.component.html',
//   styleUrls: ['./restaurant-details.component.css'],
//   imports: [
//     CommonModule,
//     RestaurantCardComponent,
//     RouterModule,
//     StarRatingComponent,
//     ReactiveFormsModule,
//     ArcgisMarkerDirective,
//     ArcgisMapComponent,
//   ],
// })
// export class RestaurantDetailsComponent implements OnInit {
//   constructor(
//     private readonly router: Router,
//     private readonly route: ActivatedRoute,
//     private readonly restaurantServices: RestaurantsService,
//     private readonly userServices: UsersService,
//     private fb: NonNullableFormBuilder
//   ) {}

//   restaurant!: Restaurant;
//   comments!: Commentary[];
//   userComment = false;

//   newComment: Commentary = {
//     stars: 0,
//     text: '',
//   };

//   formComment!: FormGroup;
//   commentControl!: FormControl<string>;

//   goBack() {
//     this.router.navigate(['/restaurant']);
//   }

//   ngOnInit(): void {
//     this.route.data.subscribe((restaurant) => {
//       this.restaurant = restaurant['restaurant'];
//     });

//     this.restaurantServices
//       .getComments(this.restaurant.id)
//       .subscribe((c) => (this.comments = c.comments));

//     this.userServices.getUser(0, true).subscribe(
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       (u) => (this.userComment = this.userHaveComment(this.comments, u.id!))
//     );

//     this.commentControl = this.fb.control('', [Validators.required]);

//     this.formComment = this.fb.group({
//       comment: this.commentControl,
//     });
//   }

//   addComment() {
//     this.newComment.text = this.commentControl.value;

//     this.restaurantServices
//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       .addComment(this.restaurant.id!, this.newComment)
//       .subscribe({
//         next: () => {
//           setTimeout(() => window.location.reload(), 400);
//         },
//       });
//   }

//   setRating(newRating: number): void {
//     this.newComment.stars = newRating;
//   }

//   validClasses(control: FormControl, validClass: string, errorClass: string) {
//     return {
//       [validClass]: control.touched && control.valid,
//       [errorClass]: control.touched && control.invalid,
//     };
//   }

//   userHaveComment(comments: Commentary[], id: number): boolean {
//     return comments.some((c) => c.user?.id == id);
//   }
// }
