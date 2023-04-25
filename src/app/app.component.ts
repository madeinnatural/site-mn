import { NavigationService } from './core/services/navigator.service';
import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BreadCrumb, addBreadcrumb } from './states-handler/store/breadcrumb.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  loading = true;
  constructor(
    public router: Router,
    private store: Store<{ breadcrumb: BreadCrumb[] }>,
    private navigation: NavigationService
  ) {
    router.events.subscribe((event) => this.displayLoading(event));
  }

  protected displayLoading (event: Event ) {
    switch (true) {
      case event instanceof NavigationStart: {
        break;
      }
      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        const breadcrumb = this.navigation.generateBreadcrumb(this.router);
        this.store.dispatch(addBreadcrumb({ breadcrumb }));
        break;
      }
      default: {
        break;
      }
    }
  }

}
