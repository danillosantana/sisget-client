import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Injectable()
export abstract class AbstractFormBuilder<T> {
  form: T;

  constructor(public formBuilder: FormBuilder) {
  }

  buildForm(form: T) {
    this.form = form;
    return this.formBuilder.group(form);
  }
}