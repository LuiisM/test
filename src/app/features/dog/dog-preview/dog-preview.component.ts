import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

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
