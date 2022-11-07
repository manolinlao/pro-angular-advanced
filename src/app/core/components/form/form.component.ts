import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/product.model';
import { Model } from '../../../model/repository.model';
import { MODES, SharedState, StateUpdate } from '../../sharedState.service';
import { MessageService } from '../../../messages/message.service';
import { Message } from 'src/app/messages/message.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  product: Product = new Product();
  editing: boolean = false;

  constructor(
    private model: Model,
    private state: SharedState,
    private messageService: MessageService
  ) {
    this.state.changes.subscribe((upd) => this.handleStateChange(upd));
    this.messageService.reportMessage(new Message('Creating new product'));
  }

  handleStateChange(newState: StateUpdate) {
    this.editing = newState.mode == MODES.EDIT;
    if (this.editing && newState.id) {
      Object.assign(
        this.product,
        this.model.getProduct(newState.id) ?? new Product()
      );
      this.messageService.reportMessage(
        new Message(`Editing ${this.product.name}`)
      );
    } else {
      this.product = new Product();
      this.messageService.reportMessage(new Message('Creating new product'));
    }
  }

  submitForm(form: NgForm) {
    if (form.valid) {
      this.model.saveProduct(this.product);
      this.product = new Product();
      form.resetForm();
    }
  }

  ngOnInit(): void {}
}
