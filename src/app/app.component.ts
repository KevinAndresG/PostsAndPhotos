import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './shared/components/card/card.component';
import { PostsStore } from './store/posts.store';
import { PhotosStore } from './store/photos.store';
import { JsonPipe } from '@angular/common';
import { EStates } from './core/models/enums/states.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardComponent, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  readonly postsStore = inject(PostsStore);
  readonly photosStore = inject(PhotosStore);
  states = EStates;

  ngOnInit() {
    this.getPosts();
    this.getPhotos();
  }

  getPosts() {
    this.postsStore.getPosts(0);
  }

  getPhotos() {
    this.photosStore.getPhotos(0);
  }
}
