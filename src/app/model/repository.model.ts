import { Injectable } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';
import { RestDataSource } from './rest.datasource';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class Model {
  private products: Product[];
  private locator = (p: Product, id?: number) => p.id == id;
  private replaySubject: ReplaySubject<Product[]>;

  constructor(private dataSource: RestDataSource) {
    this.products = new Array<Product>();
    this.replaySubject = new ReplaySubject<Product[]>(1);

    console.log('repository constructor');

    this.dataSource.getData().subscribe((data) => {
      console.log('repository llega data');
      this.products = data;
      this.replaySubject.next(data);
      this.replaySubject.complete();
    });
  }

  //Esto se va ejecutando y no entiendo por qué!!!!!
  getProducts(): Product[] {
    console.log(
      'repository getProducts QUIEN ME LLAMA??????',
      this.products.length
    );
    return this.products;
  }

  //Esto sólo se ejecuta cuando se llama, ok!!!
  getProduct(id: number): Product | undefined {
    console.log('repository getProduct', this.products.length);
    return this.products.find((p) => this.locator(p, id));
  }

  getProductObservable(id: number): Observable<Product | undefined> {
    let subject = new ReplaySubject<Product | undefined>(1);
    this.replaySubject.subscribe((products) => {
      subject.next(products.find((p) => this.locator(p, id)));
      subject.complete();
    });
    return subject;
  }

  getNextProductId(id?: number): Observable<number> {
    let subject = new ReplaySubject<number>(1);
    this.replaySubject.subscribe((products) => {
      let nextId = 0;
      let index = products.findIndex((p) => this.locator(p, id));
      if (index > -1) {
        nextId = products[products.length > index + 1 ? index + 1 : 0].id ?? 0;
      } else {
        nextId = id || 0;
      }
      subject.next(nextId);
      subject.complete();
    });
    return subject;
  }

  getPreviousProductId(id?: number): Observable<number> {
    let subject = new ReplaySubject<number>(1);
    this.replaySubject.subscribe((products) => {
      let nextId = 0;
      let index = products.findIndex((p) => this.locator(p, id));
      if (index > -1) {
        nextId = products[index > 0 ? index - 1 : products.length - 1].id ?? 0;
      } else {
        nextId = id || 0;
      }
      subject.next(nextId);
      subject.complete();
    });
    return subject;
  }

  saveProduct(product: Product) {
    if (product.id == 0 || product.id == null) {
      this.dataSource
        .saveProduct(product)
        .subscribe((p) => this.products.push(p));
    } else {
      this.dataSource.updateProduct(product).subscribe((p) => {
        let index = this.products.findIndex((item) => this.locator(item, p.id));
        this.products.splice(index, 1, p);
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => {
      let index = this.products.findIndex((p) => this.locator(p, id));
      if (index > -1) {
        this.products.splice(index, 1);
      }
    });
  }
}
