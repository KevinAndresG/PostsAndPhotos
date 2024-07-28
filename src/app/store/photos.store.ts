import { computed, inject } from '@angular/core';
import { EStates } from '../core/models/enums/states.enum';
import { IPhotos } from '../core/models/interfaces/photos.interface';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { PhotosService } from '../core/services/photos/photos.service';
import { pipe, switchMap, tap } from 'rxjs';
interface photosState {
  photos: IPhotos[];
  state: EStates;
}

const initialState: photosState = {
  photos: [],
  state: EStates.LOADING,
};

export const PhotosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ photos }) => ({
    photosData: computed(() => photos()),
  })),
  withMethods((store, photosService = inject(PhotosService)) => ({
    getPhotos: rxMethod(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap(() => {
          return photosService.getPhotos().pipe(
            tap((photos: IPhotos[]) => {
              patchState(store, { photos, state: EStates.LOADED });
            })
          );
        })
      )
    ),
    getPhoto: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap((id) => {
          return photosService.getPhoto(id).pipe(
            tap((photos: IPhotos[]) => {
              patchState(store, { photos, state: EStates.LOADED });
            })
          );
        })
      )
    ),
    updatePhoto: rxMethod<{ id: number; photo: IPhotos }>(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap(({ id, photo }) => {
          return photosService.updatePhoto(id, photo).pipe(
            tap((photo: IPhotos) => {
              patchState(store, {
                photos: store.photos().map((p) => {
                  if (p.id === id) {
                    return photo;
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
    deletePhoto: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { state: EStates.LOADING })),
        switchMap((id) => {
          return photosService.deletePhoto(id).pipe(
            tap((photos: IPhotos[]) => {
              patchState(store, {
                photos: store.photos().filter((p) => p.id !== id),
                state: EStates.LOADED,
              });
            })
          );
        })
      )
    ),
  }))
);
