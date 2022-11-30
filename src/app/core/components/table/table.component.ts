import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Model } from '../../../model/repository.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  category: string | null = null;

  constructor(private model: Model, activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((params) => {
      this.category = params['category'] || null;
    });
  }

  ngOnInit(): void {}

  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model
      .getProducts()
      .filter((p) => this.category == null || p.category == this.category);
  }

  get categories(): string[] {
    return this.model
      .getProducts()
      .map((p) => p.category)
      .filter(
        (c, index, array) => c != undefined && array.indexOf(c) == index
      ) as string[];
  }

  deleteProduct(key?: number) {
    if (key != undefined) {
      this.model.deleteProduct(key);
    }
  }
}
