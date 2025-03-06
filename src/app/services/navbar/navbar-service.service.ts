import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private isActiveSubject = new BehaviorSubject<boolean>(false);
  isActive$ = this.isActiveSubject.asObservable();

  setActive(active: boolean) {
    this.isActiveSubject.next(active);
  }

  getActive(): boolean {
    return this.isActiveSubject.getValue();
  }
}
