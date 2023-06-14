import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }

        return next.handle(request);
    }
}
