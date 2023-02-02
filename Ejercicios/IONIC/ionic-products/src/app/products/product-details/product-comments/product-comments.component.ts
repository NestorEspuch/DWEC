import { CommonModule } from '@angular/common';
import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonicModule,
  AlertController,
  Platform,
  IonRefresher,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Comment } from '../../interfaces/comment.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-comments',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-comments.component.html',
  styleUrls: ['./product-comments.component.scss'],
})
export class ProductCommentsComponent implements OnInit, OnDestroy {
  idProd!: number;
  comments!: Comment[];
  resumeSub!: Subscription;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private productService: ProductService,
    private platform: Platform,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.loadComments();
    // If the app comes back from being paused, reload comments
    this.resumeSub = this.platform.resume.subscribe(
      () => this.ngZone.run(() => this.loadComments()) // Needs NgZone because Angular doesn't detect this event
    );
  }

  ngOnDestroy(): void {
    this.resumeSub.unsubscribe();
  }

  loadComments(refresher?: IonRefresher) {
    this.idProd = +this.route.snapshot.parent!.params['id'];
    this.productService.getComments(this.idProd).subscribe((comments) => {
      this.comments = comments;
      refresher?.complete();
    });
  }

  async addComment() {
    const alert = await this.alertCtrl.create({
      header: 'New commment',
      inputs: [
        {
          name: 'comment',
          type: 'text',
          placeholder: 'Enter your comment',
        },
      ],
      buttons: [
        {
          text: 'Add',
          role: 'ok',
        },
        {
          role: 'cancel',
          text: 'Cancel',
        },
      ],
    });

    await alert.present();
    const result = await alert.onDidDismiss();

    if (result.role === 'ok') {
      this.productService
        .addComment(this.idProd, result.data.values.comment)
        .subscribe((comment) => this.comments.push(comment));
    }
  }
}
