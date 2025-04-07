import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Output,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'features-dog-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './dog-preview.component.html',
  styleUrls: ['./dog-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogPreviewComponent {
  _dogs: string[] = [];
  @Input() set dogs(values: string[]) {
    this._dogs = values;
  }
  @Input() selectedBreed: string = '';
  @Input() selectedSubBreed: string = '';

  ngOnInit(): void {}
}
