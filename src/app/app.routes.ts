import { PreloadAllModules, provideRouter, Routes, withComponentInputBinding, withPreloading, withRouterConfig , withInMemoryScrolling } from '@angular/router';
import { HomeComponent } from './userPanel/home/home.component';
import { AboutComponent } from './userPanel/about/about.component';
import { BlogsComponent } from './userPanel/blogs/blogs.component';
import { BlogComponent } from './userPanel/blog/blog.component';
import { ContactComponent } from './userPanel/contact/contact.component';
import { HostingComponent } from './userPanel/softwareServices/hosting/hosting.component';
import { PortfolioComponent } from './userPanel/portfolio/portfolio.component';
import { ProjectComponent } from './userPanel/project/project.component';
import { ProjectsCategoryComponent } from './userPanel/projects-category/projects-category.component';
import { QoutationComponent } from './userPanel/qoutation/qoutation.component';
import { ServiceComponent } from './userPanel/softwareServices/service/service.component';
import { AdminBlogsEditComponent } from './adminPanel/admin-blogs-edit/admin-blogs-edit.component';
import { AdminBlogsComponent } from './adminPanel/admin-blogs/admin-blogs.component';
import { AdminClientsEditComponent } from './adminPanel/admin-clients-edit/admin-clients-edit.component';
import { AdminClientsComponent } from './adminPanel/admin-clients/admin-clients.component';
import { AdminHomeComponent } from './adminPanel/admin-home/admin-home.component';
import { AdminLayoutComponent } from './adminPanel/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './adminPanel/admin-login/admin-login.component';
import { AdminMessagesComponent } from './adminPanel/admin-messages/admin-messages.component';
import { AdminPlansEditComponent } from './adminPanel/admin-plans-edit/admin-plans-edit.component';
import { AdminPlansComponent } from './adminPanel/admin-plans/admin-plans.component';
import { AdminProjectsEditComponent } from './adminPanel/admin-projects-edit/admin-projects-edit.component';
import { AdminProjectsComponent } from './adminPanel/admin-projects/admin-projects.component';
import { AdminQuatationComponent } from './adminPanel/admin-quatation/admin-quatation.component';
import { AdminReviewsComponent } from './adminPanel/admin-reviews/admin-reviews.component';
import { AdminServicesEditComponent } from './adminPanel/admin-services-edit/admin-services-edit.component';
import { AdminServicesComponent } from './adminPanel/admin-services/admin-services.component';
import { AdminTeamEditComponent } from './adminPanel/admin-team-edit/admin-team-edit.component';
import { AdminTeamComponent } from './adminPanel/admin-team/admin-team.component';
import { NotFoundComponent } from './userPanel/not-found/not-found.component';
import { PrivacyComponent } from './userPanel/static-pages/privacy/privacy.component';
import { TermsComponent } from './userPanel/static-pages/terms/terms.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {path:"" , redirectTo:"/home" , pathMatch:"full" },
  {path:"home" , component : HomeComponent , title : "Mogasoft | Home"},
  {path:"about-us" , component:AboutComponent , title :"Mogasoft | About Us"},
  {path:"blogs" , component:BlogsComponent , title:"Mogasoft | Blogs"},
  {path:"blogs/:slug" , component:BlogComponent},
  {path:"contact" , component : ContactComponent , title:"Mogasoft | Contact Us"},
  {path:"hosting" , component : HostingComponent , title :"Mogasoft | Hosting"},
  {path:"portfolio" , component:PortfolioComponent},
  {path:"portfolio/:slug" , component : ProjectComponent},
  {path:"projects/:category" , component:ProjectsCategoryComponent},
  {path:"qoutation" , component:QoutationComponent},
  {path:"services/:category" , component:ServiceComponent},
  // 
  
  { path: "ms-admin", component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminHomeComponent },
      { path: "projects", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminProjectsComponent },
      { path: "projects/edit-project/:id", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminProjectsEditComponent },
      { path: "blogs", data: { roles: ['Admin', 'Marketer'] }, canActivate: [authGuard], component: AdminBlogsComponent },
      { path: "blogs/edit-blog/:id", data: { roles: ['Admin' , 'Marketer'] }, canActivate: [authGuard], component: AdminBlogsEditComponent },
      { path: "services", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminServicesComponent },
      { path: "services/service-edit/:id", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminServicesEditComponent },
      { path: "reviews", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminReviewsComponent },
      { path: "clients", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminClientsComponent },
      { path: "clients/edit-client/:id", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminClientsEditComponent },
      { path: "team", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminTeamComponent },
      { path: "team/team-edit/:id", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminTeamEditComponent },
      { path: "messages", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminMessagesComponent },
      { path: "quatations", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminQuatationComponent },
      { path: "plans", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminPlansComponent },
      { path: "plans/plan-edit/:id", data: { roles: ['Admin'] }, canActivate: [authGuard], component: AdminPlansEditComponent }
    ]
  },
  { path: "not-found", component: NotFoundComponent, title: "Not Found" },
  { path: "privacy-policy", component: PrivacyComponent, title: "Privacy Policy" },
  { path: "terms-conditions" , component:TermsComponent , title: "Terms and Conditions"},
  { path: "**", redirectTo: "/not-found", pathMatch: "full", title: "Not Found!!", }
];

export const appProviders = [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      })
    )
  ];