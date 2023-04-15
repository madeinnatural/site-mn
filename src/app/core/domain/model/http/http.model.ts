import { HttpHeaders } from '@angular/common/http';
export interface HttpResponse {
  status: number;
  statusText: string;
  headers: HttpHeaders;
  body: any;
}
