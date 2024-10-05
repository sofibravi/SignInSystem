import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album.component';

const albumRoutes: Routes = [
  {
    path: '',
    component: AlbumComponent,
  },
  {
    path: ':id/posts',
    loadChildren: () =>
      import('../post/post.module').then((postModule) => postModule.PostModule),
  },
  {
    path: ':id/photos',
    loadChildren: () =>
      import('../photos/photos.module').then(
        (photosModule) => photosModule.PhotosModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(albumRoutes)],
  exports: [RouterModule],
})
export class AlbumRoutingModule {}
