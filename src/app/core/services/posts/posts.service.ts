import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import axios from 'axios';
import { IPosts } from '../../models/interfaces/posts.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // constructor(private http: HttpClient) {}

  private apiUrl = 'https://jsonplaceholder.typicode.com/';

  // aca lo hago con HttpClient tambien pero me gusta mas usar axios.
  // de igual manera funciona si se descomenta

  // getPosts(): Observable<IPosts[]> {
  //   return this.http.get<IPosts[]>(this.apiUrl + 'posts');
  // }

  getPosts(): Observable<IPosts[]> {
    return from(
      axios
        .get<IPosts[]>(this.apiUrl + 'posts')
        .then((response) => response.data)
    );
  }

  getPost(id: number): Observable<IPosts[]> {
    return from(
      axios.get<IPosts>(`${this.apiUrl}posts/${id}`).then((response) => {
        return [response.data];
      })
    );
  }

  addPost(post: any): Observable<any> {
    return from(
      axios.post(this.apiUrl + 'posts', post).then((response) => response.data)
    );
  }

  updatePost(id: number, post: IPosts): Observable<any> {
    return from(
      axios.put(`${this.apiUrl}posts/${id}`, post).then((response) => {
        return response.data;
      })
    );
  }

  deletePost(id: number): Observable<any> {
    return from(
      axios
        .delete(`${this.apiUrl}posts/${id}`)
        .then((response) => response.data)
    );
  }
}
