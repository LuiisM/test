import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'features-dog-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule],
  templateUrl: './dog-preview.component.html',
  styleUrls: ['./dog-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DogPreviewComponent {
  readonly dialog = inject(MatDialog);
  _dogs: string[] = [];
  @Input() set dogs(values: string[]) {
    this._dogs = values;
  }
  @Input() selectedBreed: string = '';
  @Input() selectedSubBreed: string = '';

  _openImage(dog: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { img: dog },
      maxHeight: '100%',
      maxWidth: '100%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
  ngOnInit(): void {}
}
