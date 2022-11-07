import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable()
export class StaticDataSource {
  private data: Product[];

  constructor() {
    this.data = new Array<Product>(
      new Product(1, 'kayak', 'watersports', 275),
      new Product(2, 'lifejacket', 'watersports', 48.95),
      new Product(3, 'soccer ball', 'soccer', 19.5),
      new Product(4, 'corner flags', 'soccer', 39.45),
      new Product(5, 'thinking cap', 'chess', 16)
    );
  }

  getData(): Product[] {
    return this.data;
  }
}
