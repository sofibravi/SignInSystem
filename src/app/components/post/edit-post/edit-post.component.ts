import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EditPostComponent implements OnInit, OnDestroy {
  idPost: number;
  editPostForm: FormGroup;
  error: string | null = null;
  isSubmitted: boolean = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private albumService: AlbumService,
    private ref: DynamicDialogRef
  ) {
    this.editPostForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit(): void {
    this.idPost = this.config.data?.id;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.editPostForm.invalid) {
      return;
    }
    const { title, body } = this.editPostForm.value;
    const updatedPost = {
      id: this.idPost,
      title,
      body,
    };

    this.albumService
      .updatePost(updatedPost)
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
