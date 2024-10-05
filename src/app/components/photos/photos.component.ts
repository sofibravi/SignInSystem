import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, takeUntil, tap } from 'rxjs';
import { Album } from '../../models/album';
import { Photo } from '../../models/photo';
import { AlbumService } from '../../services/album.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomModalService } from '../../helpers/customModal/custom-modal.service';
import { MessageSeverity } from '../../helpers/customModal/message-severity.enum';
import { DeletePhotoComponent } from './delete-photo/delete-photo.component';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PhotosComponent implements OnInit {
  page: number;
  photos$: Observable<Photo[]>;
  album$: Observable<Album>;

  initializeData$: Observable<number>;
  route: string = '/album';
  ref: DynamicDialogRef | undefined;

  constructor(
    private albumService: AlbumService,
    private activatedRoute: ActivatedRoute,
    private customModalService: CustomModalService
  ) {}

  ngOnInit(): void {
    this.initializeData$ = this.activatedRoute.paramMap.pipe(
      map((params) => {
        return Number(params.get('id'));
      }),
      tap((idAlbum: number) => {
        this.album$ = this.getAlbum(idAlbum);
        this.photos$ = this.getPhotos(idAlbum);
      })
    );
  }

  getAlbum(idAlbum: number): Observable<Album> {
    return this.albumService.getAlbum(idAlbum);
  }

  getPhotos(idAlbum: number): Observable<Photo[]> {
    return this.albumService
      .getAlbumPhotos(idAlbum)
      .pipe(switchMap(() => this.albumService.photos$));
  }

  onDeletePhoto(idPhoto: number | Event): void {
    const id = Number(idPhoto);
    this.customModalService.show(
      DeletePhotoComponent,
      {
        data: {
          id,
        },
        header: '¿Desea eliminar la foto?',
      },
      {
        severity: MessageSeverity.SUCCESS,
        summary: 'Foto eliminada correctamente',
      }
    );
  }
}
