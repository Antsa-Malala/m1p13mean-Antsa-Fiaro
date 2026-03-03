import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _loading$ = new BehaviorSubject<boolean>(false); // état interne
  loading$ = this._loading$.asObservable(); // Observable exposé

  show() { this._loading$.next(true); }  // activer spinner
  hide() { this._loading$.next(false); } // désactiver spinner
}