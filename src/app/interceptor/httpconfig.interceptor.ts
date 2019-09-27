import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localUser = localStorage.getItem('user');
    const user = localUser ? JSON.parse(localUser) : null;

    if (user && user.token) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${user.token}`)
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }

    request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body && !event.body.success) {
          throw new Error(event.body.message);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => throwError(error.message))
    );
  }
}
