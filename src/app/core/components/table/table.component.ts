import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Model } from '../../../model/repository.model';
import { MODES, SharedState } from '../../sharedState.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  constructor(private model: Model, private state: SharedState) {}

  ngOnInit(): void {}

  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    return this.model.getProducts();
  }

  deleteProduct(key?: number) {
    if (key != undefined) {
      this.model.deleteProduct(key);
    }
  }

  editProduct(key?: number) {
    this.state.update(MODES.EDIT, key);
  }

  createProduct() {
    this.state.update(MODES.CREATE);
  }
}
