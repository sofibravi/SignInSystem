import { Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrl: './delete-post.component.scss',
})
export class DeletePostComponent implements OnInit, OnDestroy {
  idPost: number;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.idPost = this.config.data?.id;
  }

  closeModal() {
    this.ref.close();
  }
  deletePost() {
    this.albumService
      .deletePost(this.idPost)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (post) => {
          this.ref.close(post);
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
