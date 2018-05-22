import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, retryWhen, delay, map, filter } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesService {

  // private readonly URL_BASE: string = 'http://localhost:3000/';
  private readonly URL_BASE: string = 'https://e292fe01.ngrok.io/';

  constructor(private http: HttpClient) {
  }

  getMovies(start: number, end: number): Observable<Movie[]> {
    return this.http
    // Type-checking the response => .get<Movie[]>
    .get<Movie[]>(this.URL_BASE + `movies?_start=${start}&_end=${end}&_sort=year,title&_order=desc,asc`)
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  getMovie(title: string): Observable<Movie> {
    // console.log(encodeURI(this.URL_BASE + `movies?title=${title}`));
    return this.http
    // Type-checking the response => .get<Movie>
    .get<Movie>(encodeURI(this.URL_BASE + `movies?title=${title}`))
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  addMovie(movie: Movie): Observable<Movie> {

    movie['id'] = uuid();

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // console.log('movie in addMovie', movie);
    return this.http
      // Type-checking the response => .post<Movie>
    .post<Movie>(encodeURI(this.URL_BASE + `movies/`), movie, httpOptions)
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  editMovie(movie: Movie): Observable<Movie> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    // console.log('movie in editMovie', movie);
    return this.http
      // Type-checking the response => .post<Movie>
    .put<Movie>(encodeURI(this.URL_BASE + `movies/${movie['id']}`), movie, httpOptions)
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  deleteMovie(movie: Movie): Observable<Movie> {

    // console.log('movie in deleteMovie', movie);
    return this.http
      // Type-checking the response => .post<Movie>
    .delete<Movie>(encodeURI(this.URL_BASE + `movies/${movie['id']}`))
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  filterMovies(filters): Observable<Movie[]> {
    console.log('filterMovies in movies-services', filters);

    const strFilters = this.checkFilters(filters);
    console.log('strFilters', strFilters);
    return this.http
    // Type-checking the response => .get<Movie[]>
    .get<Movie[]>(this.URL_BASE + `movies${strFilters}_sort=year,title&_order=desc,asc&_limit=20`)
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }

  checkFilters(filters: any) {
    let strFilters = '';
    strFilters += typeof filters['genre'] !== 'undefined' ? `?genre=${filters.genre}&` : '?';
    strFilters += typeof filters['years'] !== 'undefined' ? `year_gte=${filters.years.lower}&year_lte=${filters.years.upper}&` : '';
    return strFilters;
  }

  searchMovies(queryText: string): Observable<Movie[]> {
    console.log(this.URL_BASE + `movies?q=${queryText}&_limit=20`);
    return this.http
    // Type-checking the response => .get<Movie[]>
    .get<Movie[]>(this.URL_BASE + `movies?q=${queryText}&_limit=20`)
    .pipe(
      retryWhen(error => error.pipe(delay(500))),
      timeout(5000)
    );
  }
}
