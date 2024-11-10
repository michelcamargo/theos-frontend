import { HttpInterceptorFn } from '@angular/common/http';

export const ApiInterceptor: HttpInterceptorFn = (req, next) => {
  const authenticatedReq = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });
  return next(authenticatedReq);
};
