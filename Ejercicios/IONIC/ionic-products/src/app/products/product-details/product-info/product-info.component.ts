import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IonicModule, AlertController, NavController } from '@ionic/angular';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductDetailsComponent } from '../product-details.component';

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss'],
})
export class ProductInfoComponent implements OnInit {
  product!: Product;

  constructor(
    private alertCrl: AlertController,
    private productService: ProductService,
    private nav: NavController,
    @Inject(ProductDetailsComponent) private parentComponent: ProductDetailsComponent
  ) {}

  ngOnInit() {
    this.parentComponent.product$.subscribe(
      product => this.product = product
    );
  }

  async delete() {
    const alert = await this.alertCrl.create({
      header: 'Delete product',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.productService
              .deleteProduct(this.product.id!)
              .subscribe(() => this.nav.navigateBack(['/products']));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    alert.present();
  }
}
