import {
  ChangeDetectorRef,
  Component,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
} from '@angular/core';
import { Model } from 'src/app/model/repository.model';

@Component({
  selector: 'app-category-count',
  templateUrl: './category-count.component.html',
  styleUrls: ['./category-count.component.css'],
})
export class CategoryCountComponent implements OnInit {
  count: number = 0;
  private differ?: KeyValueDiffer<any, any>;

  constructor(
    private model: Model,
    private keyValueDiffers: KeyValueDiffers,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.differ = this.keyValueDiffers.find(this.model.getProducts()).create();
  }

  ngDoCheck() {
    if (this.differ?.diff(this.model.getProducts()) != null) {
      this.count = this.model
        .getProducts()
        .map((p) => p.category)
        .filter(
          (category, index, array) => array.indexOf(category) == index
        ).length;
    }
  }
}
