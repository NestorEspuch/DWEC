import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActionSheetController, IonicModule, IonRefresher, NavController } from '@ionic/angular';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private actionSheetCtrl: ActionSheetController,
    private navController: NavController
  ) {}

  ionViewWillEnter() {
    this.productService
      .getProducts()
      .subscribe((prods) => (this.products = prods));
  }

  reloadProducts(refresher: IonRefresher) {
    this.productService
    .getProducts()
    .subscribe((prods) => {
      this.products = prods;
      refresher.complete();
    });
  }

  async showOptions(prod: Product) {
    const actSheet = await this.actionSheetCtrl.create({
      header: prod.description,
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.productService
              .deleteProduct(prod.id!)
              .subscribe(() =>
                this.products.splice(this.products.indexOf(prod), 1)
              );
          },
        },
        {
          text: 'See details',
          icon: 'eye',
          handler: () => {
            this.navController.navigateForward(['/products', prod.id]);
          },
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    actSheet.present();
  }
}
