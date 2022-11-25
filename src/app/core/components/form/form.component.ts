import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { Model } from '../../../model/repository.model';
import { FilteredFormArray } from '../../filteredFormArray';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LimitValidator } from 'src/app/validation/limit';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  product: Product = new Product();
  editing: boolean = false;

  //usamos nuestro customizado FilteredFormArray en vez de FormArray
  keywordGroup = new FilteredFormArray([this.createKeywordFormControl()]);

  productForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z ]+$'),
      ],
      updateOn: 'change',
    }),
    category: new FormControl('', {
      validators: Validators.required,
    }),
    price: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern('^[0-9.]+$'),
        LimitValidator.Limit(300),
      ],
    }),
    details: new FormGroup({
      supplier: new FormControl('', { validators: Validators.required }),
      keywords: this.keywordGroup,
    }),
  });

  constructor(
    private model: Model,
    activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.editing = activeRoute.snapshot.params['mode'] == 'edit';
    let id = activeRoute.snapshot.params['id'];
    if (id != null) {
      model.getProductObservable(id).subscribe((p) => {
        Object.assign(this.product, p || new Product());

        this.product.name =
          activeRoute.snapshot.params['name'] ?? this.product.name;
        this.product.category =
          activeRoute.snapshot.params['category'] ?? this.product.category;
        this.product.price =
          activeRoute.snapshot.params['price'] ?? this.product.price;

        this.productForm.patchValue(this.product);
      });
    }
  }

  createKeywordFormControl(): FormControl {
    return new FormControl('', {
      validators: Validators.pattern('^[A-Za-z ]+$'),
    });
  }

  addKeywordControl() {
    this.keywordGroup.push(this.createKeywordFormControl());
  }

  removeKeywordControl(index: number) {
    this.keywordGroup.removeAt(index);
  }

  submitForm() {
    if (this.productForm.valid) {
      Object.assign(this.product, this.productForm.value);
      this.model.saveProduct(this.product);
      /*
      this.product = new Product();
      this.keywordGroup.clear();
      this.keywordGroup.push(this.createKeywordFormControl());
      this.productForm.reset();
      */
      this.router.navigateByUrl('/');
    }
  }

  resetForm() {
    this.keywordGroup.clear();
    this.keywordGroup.push(this.createKeywordFormControl());

    this.editing = true;
    this.product = new Product();
    this.productForm.reset();
  }
}
