import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Album } from '../models/album';
import { Post } from '../models/post';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private readonly URL: string = 'https://jsonplaceholder.typicode.com';

  private _posts = new BehaviorSubject<Post[]>([]);
  posts$ = this._posts.asObservable();

  private _photos = new BehaviorSubject<Photo[]>([]);
  photos$ = this._photos.asObservable();

  setPosts(posts: Post[]): void {
    this._posts.next(posts);
  }

  setPhotos(photos: Photo[]): void {
    this._photos.next(photos);
  }

  options: Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    const url = this.URL + '/albums';
    return this.httpClient.get<Album[]>(url, this.options);
  }

  getAlbum(idAlbum: number): Observable<Album> {
    const url = `${this.URL}/albums/${idAlbum}`;
    return this.httpClient.get<Album>(url);
  }

  getAlbumPosts(idAlbum: number): Observable<Post[]> {
    const url = `${this.URL}/albums/${idAlbum}/posts`;
    return this.httpClient
      .get<Post[]>(url, this.options)
      .pipe(tap((posts: Post[]) => this.setPosts(posts)));
  }

  getAlbumPhotos(idAlbum: number): Observable<Photo[]> {
    const url = `${this.URL}/albums/${idAlbum}/photos`;
    return this.httpClient
      .get<Photo[]>(url, this.options)
      .pipe(tap((photos: Photo[]) => this.setPhotos(photos)));
  }

  putPosts(
    idAlbum: number,
    idPost: number,
    postModified: Post
  ): Observable<Post> {
    const url = `${this.URL}/albums/${idAlbum}/posts/${idPost}`;
    const body = JSON.stringify(postModified);
    return this.httpClient.put<Post>(url, body, this.options).pipe(
      tap((idPostModified: Post) => {
        postModified.id = idPostModified.id;
        const posts = this._posts.value;
        const indexToUpdate = posts.findIndex((post) => post.id === idPost);
        if (indexToUpdate >= 0) {
          posts[indexToUpdate] = postModified;
          this.setPosts([...posts]);
        }
      })
    );
  }

  updatePost(post: Post): Observable<Post> {
    const updatePostUrl = `${this.URL}/posts/${post.id}`;
    return this.httpClient.put<Post>(updatePostUrl, post, this.options).pipe(
      tap((idPostModified: Post) => {
        post.id = idPostModified.id;
        const postModified = this._posts.value;
        const indexPosts = postModified.findIndex(
          (post_) => post_.id === post.id
        );
        if (indexPosts >= 0) {
          postModified[indexPosts] = post;
          this.setPosts([...postModified]);
        }
      })
    );
  }

  deletePost(idPost: number): Observable<Post> {
    const updatePostUrl = `${this.URL}/posts/${idPost}`;
    return this.httpClient.delete<Object>(updatePostUrl, this.options).pipe(
      tap((post: Post) => {
        const posts = this._posts.value;
        const postDeleted = posts.filter((post) => post.id !== idPost);
        this.setPosts(postDeleted);
      })
    );
  }

  deletePhoto(idPhoto: number): Observable<Photo> {
    const updatePhotoUrl = `${this.URL}/photos/${idPhoto}`;
    return this.httpClient.delete<Photo>(updatePhotoUrl, this.options).pipe(
      tap((photo: Photo) => {
        const photos = this._photos.value;
        const photoDeleted = photos.filter((photo) => photo.id !== idPhoto);
        this.setPhotos(photoDeleted);
      })
    );
  }
}
