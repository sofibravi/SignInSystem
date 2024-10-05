import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-delete-photo',
  templateUrl: './delete-photo.component.html',
  styleUrl: './delete-photo.component.scss',
})
export class DeletePhotoComponent implements OnInit, OnDestroy {
  idPhoto: number;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.idPhoto = this.config.data?.id;
  }

  closeModal() {
    this.ref.close();
  }
  deletePhoto() {
    this.albumService
      .deletePhoto(this.idPhoto)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (photo) => {
          this.ref.close(photo);
        },
        error: () => {
          this.ref.close();
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.complete();
    this.unsubscribe$.next();
  }
}
