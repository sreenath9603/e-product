import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartData: any = [];
  inputValue: string | any;

  cartFormControl: any = new FormControl();

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.cartService.items.subscribe((data: any) => {
      this.cartData = data;
      console.log('cartData', this.cartData);
    });
  }

  // filterCartData(cartData: any[]) {
  //   if (this.inputValue?.length > 1) {
  //     const cartDat: any = cartData.filter(
  //       (item: any) =>
  //         item.title.toLowerCase().indexOf(this.inputValue.toLowerCase()) > 0
  //     );
  //     console.log('cartData', cartDat);
  //     return cartDat;
  //   } else {
  //     return cartData.slice();
  //   }
  // }

  onDetailsClick(productId: string, category: string) {
    this.router.navigate([
      '/detail',
      { productId: productId, category: category },
    ]);
  }

  filterCartData(cartData: any[]) {
    const value: string = this.cartFormControl.value;
    console.log('value', value);
    if (value?.length > 0) {
      return cartData.filter((item) => {
        item.title.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
    } else {
      return cartData.slice();
    }
  }
}
