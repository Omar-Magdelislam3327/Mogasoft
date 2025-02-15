import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderComponent } from './loader/loader.component';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  private requestCount = 0;
  private loaderComponentRef: ComponentRef<LoaderComponent> | null = null;

  constructor(private injector: Injector, private appRef: ApplicationRef) { }

  private showLoader(): void {
    if (this.requestCount === 0 && !this.loaderComponentRef) {
      const factory = this.injector.get(ComponentFactoryResolver).resolveComponentFactory(LoaderComponent);
      const componentRef = factory.create(this.injector);
      this.appRef.attachView(componentRef.hostView);
      document.body.appendChild((componentRef.hostView as any).rootNodes[0]);
      this.loaderComponentRef = componentRef;
    }
    this.requestCount++;
  }

  private hideLoader(): void {
    this.requestCount--;
    if (this.requestCount === 0 && this.loaderComponentRef) {
      this.appRef.detachView(this.loaderComponentRef.hostView);
      this.loaderComponentRef.destroy();
      this.loaderComponentRef = null;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.showLoader();
    return next.handle(req).pipe(finalize(() => this.hideLoader()));
  }
}
