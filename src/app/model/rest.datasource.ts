import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Product } from './product.model';

export const REST_URL = new InjectionToken('rest_url');

//el REST_URL lo proveeremos al definir el provider en el model.module.ts

@Injectable()
export class RestDataSource {
  constructor(
    private http: HttpClient,
    @Inject(REST_URL) private url: string
  ) {}

  getData(): Observable<Product[]> {
    //return this.http.get<Product[]>(this.url);
    return this.sendRequest<Product[]>('GET', this.url);
  }

  saveProduct(product: Product): Observable<Product> {
    //return this.http.post<Product>(this.url, product);
    return this.sendRequest<Product>('POST', this.url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    //return this.http.put<Product>(`${this.url}/${product.id}`, product);
    return this.sendRequest<Product>(
      'PUT',
      `${this.url}/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<Product> {
    //return this.http.delete<Product>(`${this.url}/${id}`);
    return this.sendRequest<Product>('DELETE', `${this.url}/${id}`);
  }

  private sendRequest<T>(
    verb: string,
    url: string,
    body?: Product
  ): Observable<T> {
    let myHeaders = new HttpHeaders();
    myHeaders = myHeaders.set('Access-Key', '<secret>');
    myHeaders = myHeaders.set('Applition-Names', ['exampleApp', 'proAngular']);

    return this.http
      .request<T>(verb, url, { body: body, headers: myHeaders })
      .pipe(
        catchError((error: Response) => {
          console.log('CATCHERROR');
          throw `Network error: ${error.statusText} (${error.status})`;
        })
      );
  }
}
