import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: any = [];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.http.get('https://fakestoreapi.com/products/categories').subscribe(
      (data: any) => {
        console.log('data', data);
        this.categories = data;
        console.log('categories', this.categories);
      },
      (error: any) => {
        console.log('error', error);
      }
    );
  }

  onCategoryClick(category: string) {
    this.router.navigate(['/category', { category: category }]);
  }
}
