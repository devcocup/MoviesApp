import { Component, ViewEncapsulation, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MoviesService } from '../../providers/movies-service';

import { Movie } from '../../models/movie.model';
import { MoviesStateModel } from '../../store/state/movies.state';

import { InfiniteScroll, ModalController, PopoverController } from '@ionic/angular';

import { Store, Select, Actions, ofActionCompleted } from '@ngxs/store';
import { UpdateFormValue, UpdateFormStatus } from '@ngxs/form-plugin';

import { FetchMovies, SelectedMovie, DeleteMovie, AddMovie, EditMovie } from '../../store/actions/movies.actions';
import { Observable } from 'rxjs';

import { MovieModalComponent } from '../../modals/movie.modal';
import { FilterMoviePopoverComponent } from '../../popovers/filter-movie.popover';

import {default as iziToast, IziToastSettings} from 'izitoast';

@Component({
  selector: 'app-page-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

  // Reads the name of the store from the store class.
  // @Select(MoviesStateModel) movies$: Observable<Movie[]>;
  movies$: Observable<Movie[]>;
  start: number;
  end: number;
  showScrollTop: Boolean = false;
  // infiniteScroll: any;
  @ViewChild('infiniteScroll') infiniteScroll: ElementRef;
  showSkeleton: Boolean = true;

  constructor(private moviesService: MoviesService, private store: Store, private router: Router, private modalCtrl: ModalController,
              private actions$: Actions, private popoverCtrl: PopoverController) {
    this.start = 0;
    this.end = 20;
    this.movies$ = this.store.select(state => state.catalog.movies);
    this.fetchMovies(this.start, this.end);
  }

  ngOnInit() {

    /*
    console.log('ngOnInit home');
     // Check if we have movies in local storage.
     if (localStorage.getItem('@@STATE') !== 'undefined') {
      const state = JSON.parse(localStorage.getItem('@@STATE'));
      const { movies } = state.catalog;
      console.log('movies', movies);
    }
    */

    this.actions$.pipe(ofActionCompleted(AddMovie)).subscribe(() => {
      const {title, message, position} = {title: 'Add movie', message: 'Movie added successfully.', position: 'bottomLeft'};
      this.modalCtrl.dismiss();
      iziToast.success({title, message, position} as IziToastSettings);
    });

    this.actions$.pipe(ofActionCompleted(EditMovie)).subscribe(() => {
      this.modalCtrl.dismiss();
      const {title, message, position} = {title: 'Edit movie', message: 'Movie updated successfully.', position: 'bottomLeft'};
      iziToast.success({title, message, position} as IziToastSettings);
    });

    this.actions$.pipe(ofActionCompleted(DeleteMovie)).subscribe(() => {
      const {title, message, position} = {title: 'Delete movie', message: 'Movie deleted successfully.', position: 'bottomLeft'};
      iziToast.success({title, message, position} as IziToastSettings);
    });

    // this.infiniteScroll = document.getElementById('infinite-scroll');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy home');
    // localStorage.removeItem('@@STATE');
  }

  fetchMovies(name, url) {
    this.store.dispatch(new FetchMovies({start: this.start, end: this.end})).subscribe(() => {
      setTimeout( () => {
        this.showSkeleton = false;
      }, 2000);
      if (this.infiniteScroll) {
        this.infiniteScroll.nativeElement.complete();
      }
    });
  }

  viewMovieDetails(movie: Movie) {
    // console.log('viewMovieDetails', movie);
    this.store.dispatch(new SelectedMovie({title: movie.title}));
    this.router.navigateByUrl(`/detail`);
  }

  async presentModal(componentProps: any) {
    const modal = await this.modalCtrl.create({
      component: MovieModalComponent,
      componentProps: componentProps
    });
    await modal.present();

    const {data} = await modal.onWillDismiss();
    if (data) {
      console.log('data', data);
    }
  }

  addMovie() {
    // console.log('addMovie');
    const componentProps = { modalProps: { title: 'Add Movie', buttonText: 'Add Movie'}, option: 'add'};
    this.presentModal(componentProps);
  }

  editMovie(movie: Movie, index: number) {
    // console.log('editMovie', movie, 'index', index);
    movie['index'] = index;
    const componentProps = { modalProps: { title: 'Edit Movie', buttonText: 'Edit Movie', movie: movie}, option: 'edit'};
    this.presentModal(componentProps);
  }

  deleteMovie(movie: Movie) {
    // console.log('deleteMovie', movie);
    this.store.dispatch(new DeleteMovie(movie));
  }

  doInfinite() {
    // console.log('Begin async operation');
    this.showSkeleton = true;
    this.start = this.end;
    this.end += 20;
    this.showScrollTop = true;
    this.fetchMovies(this.start, this.end);
  }

  async presentPopover(event) {
    // console.log('presentPopover');
    const popover = await this.popoverCtrl.create({
      component: FilterMoviePopoverComponent,
      ev: event
    });

    await popover.present();

    const { data } = await popover.onWillDismiss();

    if (data) {
      console.log('data popover.onWillDismiss', data);
    }

  }

  scrollToTop() {
    console.log('scrollToTop');
    setTimeout( () => {window.scrollTo(0, 0); }, 1000);
  }

}
