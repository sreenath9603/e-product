import { CartService } from './cart.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'e-product';
  constructor(private cartService: CartService) {
    this.cartService.getCart();
  }
}
