import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Observable, shareReplay } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  product$: Observable<Product>;

  constructor(
    public environmentInjector: EnvironmentInjector,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.product$ = this.productService
      .getProduct(this.route.snapshot.params['id'])
      .pipe(shareReplay(1)); // There can be multiple suscriptions to this observable
  }

  ngOnInit() {
    this.product$.subscribe((product) => (this.product = product));
  }

  getProduct(): Observable<Product> {
    return this.product$;
  }
}
