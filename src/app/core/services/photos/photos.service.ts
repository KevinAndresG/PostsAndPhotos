import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, Observable } from 'rxjs';
import { IPhotos } from '../../models/interfaces/photos.interface';

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  // constructor(private http: HttpClient) {}

  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  // aca lo hago con HttpClient tambien pero me gusta mas usar axios.
  // de igual manera funciona si se descomenta

  // getPhotos(): Observable<IPhotos[]> {
  //   return this.http.get<IPhotos[]>(this.apiUrl + 'photos');
  // }

  getPhotos(): Observable<IPhotos[]> {
    return from(
      axios
        .get<IPhotos[]>(this.apiUrl + 'photos')
        .then((response) => response.data)
    );
  }

  getPhoto(id: number): Observable<IPhotos[]> {
    return from(
      axios.get<IPhotos>(`${this.apiUrl}photos/${id}`).then((response) => {
        return [response.data];
      })
    );
  }

  addPhoto(photo: any): Observable<any> {
    return from(
      axios
        .post(this.apiUrl + 'photos', photo)
        .then((response) => response.data)
    );
  }

  updatePhoto(id: number, photo: IPhotos): Observable<any> {
    return from(
      axios.put(`${this.apiUrl}photos/${id}`, photo).then((response) => {
        return response.data;
      })
    );
  }

  deletePhoto(id: number): Observable<any> {
    return from(
      axios
        .delete(`${this.apiUrl}photos/${id}`)
        .then((response) => response.data)
    );
  }
}
