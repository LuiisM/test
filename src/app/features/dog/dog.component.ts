import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DogsService } from './services/dogs.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DogFiltersComponent } from './dog-filters/dog-filters.component';
import { DogPreviewComponent } from './dog-preview/dog-preview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

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
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dog.component.html',
  styleUrls: ['./dog.component.scss'],
})
export class DogComponent implements AfterViewInit {
  @Output() breed: { [key: string]: string[] } = {};
  @ViewChild(DogFiltersComponent) dogFiltersComponent!: DogFiltersComponent;
  dogs: string[] = [];
  dogService = inject(DogsService);
  suscriptions = new Subscription();
  selectedBreed = '';
  selectedSubBreed = '';
  isLoading$ = new BehaviorSubject(true);
  protected subBreeds: string[] = [];

  ngOnInit(): void {
    this._fetchAllBreeds();
  }
  ngAfterViewInit(): void {}
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
  onGenerateRandomDogs(event: boolean) {
    this.dogs = [];
    if (event) {
      const keys = Object.keys(this.breed);
      this.isLoading$.next(true);
      this.selectedBreed = keys[Math.floor(Math.random() * keys.length)];
      this.subBreeds = this.breed[this.selectedBreed] || [];
      this.selectedSubBreed =
        this.subBreeds[Math.floor(Math.random() * this.subBreeds.length)];
      this.onSelectedBreed(this.selectedBreed);
      if (this.subBreeds.length > 0) {
        this.onSelectedSubBreed(this.selectedSubBreed);
      }
      // update filters with current selection
      this.dogFiltersComponent.formGroup.controls.breedControl.setValue(
        this.selectedBreed
      );
      this.dogFiltersComponent.formGroup.controls.subBreedControl.setValue(
        this.selectedSubBreed
      );
    }
  }
  ngOnDestroy(): void {
    this.suscriptions.unsubscribe();
  }
  private _fetchAllBreeds(): void {
    this.isLoading$.next(true);
    this.suscriptions = this.dogService.getAllDogs().subscribe({
      next: (dogs) => (this.breed = dogs.message),
      complete: () => this.isLoading$.next(false),
    });
  }
  private _fetchDogs(subBreed: string): void {
    this.isLoading$.next(true);
    this.suscriptions = this.dogService
      .getDogBySubBreed(this.selectedBreed, subBreed)
      .subscribe({
        next: (dogs) => (this.dogs = dogs.message),
        complete: () => this.isLoading$.next(false),
      });
  }
  private _fetchDogsByBreed(): void {
    this.isLoading$.next(true);
    this.suscriptions = this.dogService
      .getDogByBreed(this.selectedBreed)
      .subscribe({
        next: (dogs) => (this.dogs = dogs.message),
        complete: () => this.isLoading$.next(false),
      });
  }
}
