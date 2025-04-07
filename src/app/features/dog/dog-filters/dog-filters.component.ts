import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'features-dog-filters',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
  ],
  templateUrl: './dog-filters.component.html',
  styleUrls: ['./dog-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogFiltersComponent {
  @Input() dogs: { [key: string]: string[] } = {};
  @Input() set subBreeds(value: string[]) {
    if (value.length > 0) {
      this.formGroup.controls.subBreedControl.enable();
    } else {
      this.formGroup.controls.subBreedControl.disable();
    }
    this._subBreeds = value;
  }
  @Output() selectedBreed = new EventEmitter<string>();
  @Output() selectedSubBreed = new EventEmitter<string>();
  dogBreedsValue$: Observable<string[]> = new Observable();
  formGroup = new FormGroup({
    breedControl: new FormControl(''),
    subBreedControl: new FormControl(''),
  });
  _subBreeds: string[] = [];

  ngOnInit(): void {
    const breedControl = this.formGroup.get('breedControl') as FormControl;
    this.dogBreedsValue$ = breedControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  _onBreedSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedBreed.emit(event.option.value);
  }
  _onSubBreedSelected(event: MatSelectChange) {
    this.selectedSubBreed.emit(event.value);
  }
  private _filter(value: string): string[] {
    const values: string[] = [];
    const filterValue = value.toLowerCase();
    Object.entries(this.dogs).forEach((option) => {
      if (option[0].toLowerCase().includes(filterValue)) {
        values.push(option[0]);
      }
    });
    return values;
  }
}
