import { Component, ViewEncapsulation } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AlbumComponent {
  page: number;
  albums$: Observable<Album[]> = this.albumService.getAlbums();
  constructor(private albumService: AlbumService, private router: Router) {}

  ngOnInit(): void {}

  showPosts(idAlbum: number): void {
    this.router.navigate(['/album', idAlbum, 'posts']);
  }

  showPhotos(idAlbum: number): void {
    this.router.navigate(['/album', idAlbum, 'photos']);
  }
}
