import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CardAlbumComponent } from './card-album.component';

@NgModule({
  declarations: [CardAlbumComponent],
  imports: [CommonModule, CardModule],
  exports: [CardAlbumComponent],
})
export class CardAlbumModule {}
