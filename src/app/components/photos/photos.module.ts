import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardItemModule } from '../../shared/card-item/card-item.module';
import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import { CardAlbumModule } from '../../shared/card-album/card-album.module';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { DeletePhotoModule } from './delete-photo/delete-photo.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PhotosComponent],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    CardItemModule,
    CardAlbumModule,
    BreadcrumbModule,
    DeletePhotoModule,
    NgxPaginationModule,
  ],
  exports: [PhotosComponent],
})
export class PhotosModule {}
