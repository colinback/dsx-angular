import { EventManager } from '../event-manager.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private eventManager: EventManager) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {}, (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (!(err.status === 401 && (err.message === '' || (err.url && err.url.indexOf('/api/account') === 0)))) {
              if (this.eventManager !== undefined) {
                const content = {
                  status: err.status,
                  message: err.message || 'Unknown Error'
                };
                this.eventManager.broadcast({name: 'dsxApp.httpError', content: content});
              }
            }
          }
        })
      );
    }
}
