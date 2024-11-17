import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  Subscription,
} from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-smart-type-ahead',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './smart-type-ahead.component.html',
  styleUrl: './smart-type-ahead.component.css',
})
export class SmartTypeAheadComponent {
  @Input() suggestions: any[] = [];
  @Input() pholder: string = '';
  @Output() selectedSuggestion = new EventEmitter<string>();
  private sun: Subscription = new Subscription();
  searchControl = new FormControl();
  filteredSuggestions: any[] = [];
  filterLimit: number = 8;

  constructor() {}

  activeSubscription() {
    console.log('sub activated');

    this.sun = this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: (value) => {
          this.filterSuggestions(value);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deActiveSubscription() {
    this.sun.unsubscribe();
  }

  filterSuggestions(query: string) {
    this.filteredSuggestions = this.suggestions.filter((suggestion) => {
      return suggestion.name.includes(query);
    });
  }

  selectSuggestion(suggestion: string) {
    this.selectedSuggestion.emit(suggestion);
    this.searchControl.setValue(suggestion);
    this.filteredSuggestions = [];
    this.deActiveSubscription();
    console.log('sub deactivated');
  }
}
