import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DogsService } from './services/dogs.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Dog } from './dog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { DogFiltersComponent } from './dog-filters/dog-filters.component';
import { DogPreviewComponent } from './dog-preview/dog-preview.component';

@Component({
  selector: 'features-dog',
  standalone: true,
  imports: [
    CommonModule,
    DogFiltersComponent,
    DogPreviewComponent,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss'],
})
export class DogComponent {
  @Output() breed: { [key: string]: string[] } = {};
  dogs: string[] = [];
  dogService = inject(DogsService);
  selectedBreed = '';
  selectedSubBreed = '';
  protected subBreeds: string[] = [];

  ngOnInit(): void {
    this._fetchAllBreeds();
  }
  onSelectedBreed(event: string) {
    this.subBreeds = this.breed[event] || [];
    this.selectedBreed = event;
    this.dogs = [];
    if (this.subBreeds.length === 0) {
      this._fetchDogsByBreed();
    }
  }
  onSelectedSubBreed(event: string) {
    this.dogs = [];
    this.selectedSubBreed = event;
    this._fetchDogs(event);
  }
  private _fetchAllBreeds(): void {
    this.dogService.getAllDogs().subscribe((dogs) => {
      this.breed = dogs.message;
    });
  }
  private _fetchDogs(subBreed: string): void {
    this.dogService
      .getDogBySubBreed(this.selectedBreed, subBreed)
      .subscribe((dogs) => {
        this.dogs = dogs.message;
      });
  }
  private _fetchDogsByBreed(): void {
    this.dogService.getDogByBreed(this.selectedBreed).subscribe((dogs) => {
      this.dogs = dogs.message;
    });
  }
}
