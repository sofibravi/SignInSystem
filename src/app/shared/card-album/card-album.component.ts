import { Component, Input } from '@angular/core';
import { Album } from '../../models/album';

@Component({
  selector: 'app-card-album',
  templateUrl: './card-album.component.html',
  styleUrl: './card-album.component.scss',
})
export class CardAlbumComponent {
  @Input() album: Album;
}
