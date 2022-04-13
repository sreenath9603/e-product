import { CartService } from './../../cart.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  selectedCategory: string = '';
  productDetails: any = null;
  selectedId: number = 0;
  cartData: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getCartData();
  }

  getParams() {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log('params', params);
      this.selectedCategory = params.category;
      this.selectedId = params.productId as unknown as number;
      this.getProductDetails();
    });
  }

  getProductDetails() {
    this.http
      .get(`https://fakestoreapi.com/products/${this.selectedId}`)
      .subscribe(
        (data: any) => {
          console.log('data', data);
          this.productDetails = data;
          console.log('productDetails', this.productDetails);
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  getCartData() {
    this.cartService.items.subscribe((data: any) => {
      console.log('items', data);
      this.cartData = data;
      console.log('cartData', this.cartData);
    });
  }

  addToCart() {
    this.cartData.push(this.productDetails);
    this.cartService.addToCart(this.cartData);
  }
}
