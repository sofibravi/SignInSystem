import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosComponent } from './photos.component';

const photosRoutes: Routes = [
  {
    path: '',
    component: PhotosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(photosRoutes)],
  exports: [RouterModule],
})
export class PhotosRoutingModule {}
