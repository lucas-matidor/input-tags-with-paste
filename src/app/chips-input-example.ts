import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

/**
 * @title Chips with input
 */
@Component({
  selector: 'chips-input-example',
  templateUrl: 'chips-input-example.html',
  styleUrls: ['chips-input-example.css'],
})
export class ChipsInputExample {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: string[] = ['Lemon', 'Lime', 'Apple'];

  pasteEventListener: EventListener;

  onPaste(event: any): void {
    event.preventDefault();
    event.clipboardData.getData('Text').split(/;|,|\n/).forEach((value: string) => {
      if (value.trim()) {
        this.fruits.push(value.trim());
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value.trim());
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.fruits, event.previousIndex, event.currentIndex);
  }
}

/**  Copyright 2022 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
