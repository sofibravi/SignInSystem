import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePostComponent } from './delete-post.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [DeletePostComponent],
  imports: [CommonModule, ButtonModule],
  exports: [DeletePostComponent],
})
export class DeletePostModule {}
