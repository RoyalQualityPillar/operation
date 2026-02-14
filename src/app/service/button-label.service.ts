import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ButtonLabelService {
  labels = {
    save: 'Save',
    submit: 'Submit',
    clear: 'Clear',
    create: 'Create',
    update: 'Update',
    //you can add new button
  };

  getLabel(key: string): string {
    return this.labels[key];
  }

  setLabel(key: string, value: string): void {
    this.labels[key] = value;
  }
}
