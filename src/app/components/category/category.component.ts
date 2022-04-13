import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  selectedCategory: string = '';
  categoryDetails: any = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.activatedRoute.params.subscribe((params: any) => {
      console.log('params', params);
      this.selectedCategory = params.category;
      this.getCategoryDetails();
    });
  }

  getCategoryDetails() {
    this.http
      .get(
        `https://fakestoreapi.com/products/category/${this.selectedCategory}`
      )
      .subscribe(
        (data: any) => {
          console.log('data', data);
          this.categoryDetails = data;
          console.log('categoryDetails', this.categoryDetails);
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  onDetailsClick(productId: string, category: string) {
    this.router.navigate([
      '/detail',
      { productId: productId, category: category },
    ]);
  }
}
