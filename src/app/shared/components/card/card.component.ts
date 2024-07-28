import { Component, inject, input } from '@angular/core';
import { IPhotos } from '../../../core/models/interfaces/photos.interface';
import { JsonPipe } from '@angular/common';
import { IPosts } from '../../../core/models/interfaces/posts.interface';
import { PostsStore } from '../../../store/posts.store';
import { PhotosStore } from '../../../store/photos.store';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  post = input.required<IPosts>();
  photo = input.required<IPhotos>();
  readonly postsStore = inject(PostsStore);
  readonly photosStore = inject(PhotosStore);

  updateCard(id: number) {
    this.photosStore.updatePhoto({
      id: id,
      photo: {
        albumId: 1000,
        id: 1,
        thumbnailUrl: 'https://via.placeholder.com/150/771796',
        title: 'Photo Title Updated',
        url: 'https://via.placeholder.com/150/771796',
      },
    });
    this.postsStore.updatePost({
      id: id,
      post: {
        userId: 1000,
        id: 1,
        title: 'Post Title Updated',
        body: 'Post Body Updated',
      },
    });
  }
  deleteCard(id: number) {
    this.photosStore.deletePhoto(id);
    this.postsStore.deletePost(id);
  }
}
