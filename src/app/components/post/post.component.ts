import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Album } from '../../models/album';
import { Post } from '../../models/post';
import { AlbumService } from '../../services/album.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CustomModalService } from '../../helpers/customModal/custom-modal.service';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MessageSeverity } from '../../helpers/customModal/message-severity.enum';
import { DeletePostComponent } from './delete-post/delete-post.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
  page: number;
  posts$: Observable<Post[]>;
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
        this.posts$ = this.getPosts(idAlbum);
      })
    );
  }

  getAlbum(idAlbum: number): Observable<Album> {
    return this.albumService.getAlbum(idAlbum);
  }

  getPosts(idAlbum: number): Observable<Post[]> {
    return this.albumService
      .getAlbumPosts(idAlbum)
      .pipe(switchMap(() => this.albumService.posts$));
  }

  onChangePost(idPost: number | Event): void {
    const id = Number(idPost);
    this.customModalService.show(
      EditPostComponent,
      {
        data: {
          id,
        },
        header: 'Editar post',
      },
      {
        severity: MessageSeverity.SUCCESS,
        summary: 'Post editado correctamente',
      }
    );
  }

  onDeletePost(idPost: number | Event): void {
    const id = Number(idPost);
    this.customModalService.show(
      DeletePostComponent,
      {
        data: {
          id,
        },
        header: '¿Desea eliminar el post?',
      },
      {
        severity: MessageSeverity.SUCCESS,
        summary: 'Post eliminado correctamente',
      }
    );
  }
}
