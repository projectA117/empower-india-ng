import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading: WritableSignal<boolean> = signal(false);
  constructor() {}

  // private isLoading = new BehaviorSubject<boolean>(false);
  // loading$ = this.isLoading.asObservable();
  show() {
    this._loading.set(true);
    console.log('LoaderComponent: isLoading() changed to:', this._loading());
  }
  hide() {
    this._loading.set(false);
  }
  get loading(): Signal<boolean> {
    return this._loading;
  }
}
