import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    AlbumRoutingModule,
    NgxPaginationModule,
  ],
  exports: [AlbumComponent],
})
export class AlbumModule {}
