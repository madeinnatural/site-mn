import { Injectable } from '@angular/core';
import { BreadCrumb } from 'src/app/states-handler/store/breadcrumb.store';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  constructor() { }

  generateBreadcrumb (router: any) {
    const mapRoute = (route: any) => {
      const children = (route.children || []).map(mapRoute);
      return {
        url: route.path || '',
        label: (route.data || {})['title'] || '',
        children: children.length ? children : undefined,
      };
    };
    const filterRoute = (route: any) => route.label !== '';
    const labelsRouter = (router.config || []).map(mapRoute).filter(filterRoute);
    const currentUrl = router.url;
    const breadcrumb: BreadCrumb[] = [{
      label: 'Home',
      url: '/'
    }]
    const url = currentUrl.split('/');
    url.forEach((item: any, index: any) => {
      if (item !== '') {
        const label = labelsRouter.find((route: any) => route.url === item)?.label || labelsRouter.find((route: any) => route.children?.find((child: any) => child.url === item))?.children?.find((child: any) => child.url === item)?.label || item;
        breadcrumb.push({
          label,
          url: url.slice(0, index + 1).join('/')
        });
      }
    });
    return breadcrumb;
  }

}
