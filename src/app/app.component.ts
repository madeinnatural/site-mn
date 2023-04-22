import { Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertoInterface } from './core/model/interfaces/Alert';
import { Component, LOCALE_ID, Inject } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { BreadCrumb, addBreadcrumb } from './states-handler/store/breadcrumb.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  faCoffee = faCoffee;

  hidderHeader = false;
  alert = false;
  alertData?: AlertoInterface;

  counterBarActive: boolean = false;
  counterBarData = {
    totalPrice: 0,
    quantity: 0,
  }

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    @Inject(LOCALE_ID) public locale: string,
    private store: Store<{ breadcrumb: BreadCrumb[] }>,
  ) {
    router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {

          const mapRoute = (route: any) => {
            const children = (route.children || []).map(mapRoute);
            return {
              url: route.path || '',
              label: (route.data || {})['title'] || '',
              children: children.length ? children : undefined,
            };
          };
          const filterRoute = (route: any) => route.label !== '';
          const labelsRouter = (this.router.config || []).map(mapRoute).filter(filterRoute);
          const currentUrl = this.router.url;

          const breadcrumb: BreadCrumb[] = [{
            label: 'Home',
            url: '/'
          }]

          const url = currentUrl.split('/');
          url.forEach((item, index) => {
            if (item !== '') {
              const label = labelsRouter.find(route => route.url === item)?.label || labelsRouter.find(route => route.children?.find((child: any) => child.url === item))?.children?.find((child: any) => child.url === item)?.label || item;
              breadcrumb.push({
                label,
                url: url.slice(0, index + 1).join('/')
              });
            }
          });
          this.store.dispatch(addBreadcrumb({ breadcrumb: breadcrumb }));
          break;
        }
        default: {
          break;
        }
      }
    });
  }

}
