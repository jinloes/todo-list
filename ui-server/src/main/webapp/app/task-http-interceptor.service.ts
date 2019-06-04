import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {AuthenticationService} from "./services/authentication.service";
import {Router} from "@angular/router";

@Injectable()
export class TaskHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this.getToken();
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
      const error = err.error.error || err.statusText;
      return throwError(error);
    }));
  }

  private getToken() {
    try {
      return this.authService.getToken();
    } catch (e) {
      // not having a token is ok here
      return null;
    }
  }
}
