import { computed, inject } from '@angular/core';
import { EStates } from '../core/models/enums/states.enum';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { IPosts } from '../core/models/interfaces/posts.interface';
import { PostsService } from '../core/services/posts/posts.service';
interface postsState {
  posts: IPosts[];
  state: EStates;
}

const initialState: postsState = {
  posts: [],
  state: EStates.LOADING,
};

export const PostsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ posts }) => ({
    postsData: computed(() => posts()),
  })),
  withMethods((store, postsService = inject(PostsService)) => ({
    getPosts: rxMethod(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap(() => {
          return postsService.getPosts().pipe(
            tap((posts: IPosts[]) => {
              patchState(store, { posts, state: EStates.LOADED });
            })
          );
        })
      )
    ),
    getPost: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap((id) => {
          return postsService.getPost(id).pipe(
            tap((posts: IPosts[]) => {
              patchState(store, { posts, state: EStates.LOADED });
            })
          );
        })
      )
    ),
    updatePost: rxMethod<{ id: number; post: IPosts }>(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap(({ id, post }) => {
          return postsService.updatePost(id, post).pipe(
            tap((post: IPosts) => {
              patchState(store, {
                posts: store.posts().map((p) => {
                  if (p.id === id) {
                    return post;
                  }
                  return p;
                }),
                state: EStates.LOADED,
              });
            })
          );
        })
      )
    ),
    deletePost: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap((id) => {
          return postsService.deletePost(id).pipe(
            tap((posts: IPosts[]) => {
              patchState(store, {
                posts: store.posts().filter((p) => p.id !== id),
                state: EStates.LOADED,
              });
            })
          );
        })
      )
    ),
  }))
);
