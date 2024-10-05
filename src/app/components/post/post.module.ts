import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardAlbumModule } from '../../shared/card-album/card-album.module';
import { CardItemModule } from '../../shared/card-item/card-item.module';
import { PostRoutingModule } from './post-routing.module';
import { PostComponent } from './post.component';
import { BreadcrumbModule } from '../../shared/breadcrumb/breadcrumb.module';
import { EditPostModule } from './edit-post/edit-post.module';
import { DeletePostModule } from './delete-post/delete-post.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    CardAlbumModule,
    CardItemModule,
    PostRoutingModule,
    BreadcrumbModule,
    EditPostModule,
    DeletePostModule,
    NgxPaginationModule,
  ],
  exports: [PostComponent],
})
export class PostModule {}
