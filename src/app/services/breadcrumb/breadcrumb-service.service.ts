import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

interface Breadcrumb {
  label: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.breadcrumbs.next(this.buildBreadcrumbs(this.router.routerState.snapshot.root));
    });
  }

  private buildBreadcrumbs(
    route: any,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: any[] = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      const routeURL: string = child.url.map((segment: any) => segment.path).join('/');
      if (routeURL) {
        url += `/${routeURL}`;
      }
      if (child.data && Array.isArray(child.data.breadcrumb)) {
        child.data.breadcrumb.forEach((breadcrumb: any) => {
          breadcrumbs.push({
            label: breadcrumb.label,
            url: breadcrumb.url || url,
          });
        });
      } else if (child.data && child.data.breadcrumb) {
        breadcrumbs.push({
          label: child.data.breadcrumb,
          url,
        });
      }
      this.buildBreadcrumbs(child, url, breadcrumbs);
    }
  
    return breadcrumbs;
  }
  

  getBreadcrumbData(): Observable<Breadcrumb[]> {
    return this.breadcrumbs$;
  }
}
