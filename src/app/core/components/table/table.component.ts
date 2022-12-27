import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { Model } from '../../../model/repository.model';
import { ActivatedRoute } from '@angular/router';
import { HighlightTrigger } from '../../table.animations';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  animations: [HighlightTrigger],
})
export class TableComponent implements OnInit, OnChanges {
  category: string | null = null;

  // puede ser que si algo en model o activeRoute cambia, me llegue el docheck??? y se repinte el html???
  constructor(private model: Model, activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe((params) => {
      this.category = params['category'] || null;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('table onchanges');
  }

  ngDoCheck() {
    console.log('table ngDoCheck');
  }

  ngOnInit(): void {
    console.log('table init');
  }

  ngAfterContentInit() {
    console.log('table aftercontentinit');
  }

  pintaTraza() {
    console.log('pinto traza');
  }

  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }

  getProducts(): Product[] {
    console.log('table getProducts');
    return this.model
      .getProducts()
      .filter((p) => this.category == null || p.category == this.category);
  }

  get categories(): string[] {
    console.log('table get categories');
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

  // Para las animations
  highlightCategory: string = '';
  getRowState(category: string | undefined): string {
    return this.highlightCategory == ''
      ? ''
      : this.highlightCategory == category
      ? 'selected'
      : 'notSelected';
  }
}
