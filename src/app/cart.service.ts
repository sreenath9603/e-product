import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: any = new BehaviorSubject(null);

  constructor() {
    this.getCart();
  }

  addToCart(product: any) {
    const items: any = localStorage.setItem('cart', JSON.stringify(product));
    this.items.next(items);
  }

  getCart() {
    let items: any = JSON.parse(localStorage.getItem('cart') || '[]');
    console.log('items', items);
    this.items.next(items);
  }
}
