import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { AdminLayoutComponent } from './adminPanel/admin-layout/admin-layout.component';
import { AdminSidebarComponent } from './shared/admin-sidebar/admin-sidebar.component';
import { AdminHomeComponent } from './adminPanel/admin-home/admin-home.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AdminProjectsComponent } from './adminPanel/admin-projects/admin-projects.component';
import { AdminBlogsComponent } from './adminPanel/admin-blogs/admin-blogs.component';
import { AdminClientsComponent } from './adminPanel/admin-clients/admin-clients.component';
import { AdminTeamComponent } from './adminPanel/admin-team/admin-team.component';
import { AdminPlansComponent } from './adminPanel/admin-plans/admin-plans.component';
import { AdminMessagesComponent } from './adminPanel/admin-messages/admin-messages.component';
import { AdminQuatationComponent } from './adminPanel/admin-quatation/admin-quatation.component';
import { AdminReviewsComponent } from './adminPanel/admin-reviews/admin-reviews.component';
import { EditorModule } from 'primeng/editor';
import { NormalHtmlPipe } from './core/pipes/normal-html.pipe';
import { InterceptorInterceptor } from './core/interceptor/interceptor.interceptor';
import { LoaderComponent } from './core/interceptor/loader/loader.component';
import { AdminLoginComponent } from './adminPanel/admin-login/admin-login.component';
import { ChartModule } from 'angular-highcharts';
import { AdminServicesComponent } from './adminPanel/admin-services/admin-services.component';
import { AdminBlogsEditComponent } from './adminPanel/admin-blogs-edit/admin-blogs-edit.component';
import { AdminClientsEditComponent } from './adminPanel/admin-clients-edit/admin-clients-edit.component';
import { AdminPlansEditComponent } from './adminPanel/admin-plans-edit/admin-plans-edit.component';
import { AdminProjectsEditComponent } from './adminPanel/admin-projects-edit/admin-projects-edit.component';
import { AdminReviewsEditComponent } from './adminPanel/admin-reviews-edit/admin-reviews-edit.component';
import { AdminServicesEditComponent } from './adminPanel/admin-services-edit/admin-services-edit.component';
import { AdminTeamEditComponent } from './adminPanel/admin-team-edit/admin-team-edit.component';
import { NotFoundComponent } from './userPanel/not-found/not-found.component';


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AdminSidebarComponent,
    AdminHomeComponent,
    AdminProjectsComponent,
    AdminBlogsComponent,
    AdminClientsComponent,
    AdminTeamComponent,
    AdminPlansComponent,
    AdminMessagesComponent,
    AdminQuatationComponent,
    AdminReviewsComponent,
    NormalHtmlPipe,
    LoaderComponent,
    AdminLoginComponent,
    AdminServicesComponent,
    AdminBlogsEditComponent,
    AdminClientsEditComponent,
    AdminPlansEditComponent,
    AdminProjectsEditComponent,
    AdminReviewsEditComponent,
    AdminServicesEditComponent,
    AdminTeamEditComponent,
    NotFoundComponent,
  ],
  imports: [
    ChartModule,
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    NavbarModule,
    FooterModule,
    HttpClientModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    EditorModule,
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true },
  ], bootstrap: [AppComponent]
})
export class AppModule { }
