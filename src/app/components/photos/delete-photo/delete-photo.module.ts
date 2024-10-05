import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePhotoComponent } from './delete-photo.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [DeletePhotoComponent],
  imports: [CommonModule, ButtonModule],
  exports: [DeletePhotoComponent],
})
export class DeletePhotoModule {}
