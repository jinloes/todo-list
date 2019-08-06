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
      let error = {
        message: this.getErrorMessage(err),
        httpStatus: err.status
      };
      return throwError(error);
    }));
  }

  private getErrorMessage(err) {
    let message: String = null;
    if (err.error) {
      message = err.error.error
    }
    return message ? message : err.statusText;
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
