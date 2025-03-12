import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './adminPanel/admin-layout/admin-layout.component';
import { AdminHomeComponent } from './adminPanel/admin-home/admin-home.component';
import { AdminProjectsComponent } from './adminPanel/admin-projects/admin-projects.component';
import { AdminBlogsComponent } from './adminPanel/admin-blogs/admin-blogs.component';
import { AdminClientsComponent } from './adminPanel/admin-clients/admin-clients.component';
import { AdminTeamComponent } from './adminPanel/admin-team/admin-team.component';
import { AdminMessagesComponent } from './adminPanel/admin-messages/admin-messages.component';
import { AdminQuatationComponent } from './adminPanel/admin-quatation/admin-quatation.component';
import { AdminPlansComponent } from './adminPanel/admin-plans/admin-plans.component';
import { AdminReviewsComponent } from './adminPanel/admin-reviews/admin-reviews.component';
import { AdminLoginComponent } from './adminPanel/admin-login/admin-login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminServicesComponent } from './adminPanel/admin-services/admin-services.component';
import { AdminProjectsEditComponent } from './adminPanel/admin-projects-edit/admin-projects-edit.component';
import { AdminBlogsEditComponent } from './adminPanel/admin-blogs-edit/admin-blogs-edit.component';
import { AdminClientsEditComponent } from './adminPanel/admin-clients-edit/admin-clients-edit.component';
import { AdminTeamEditComponent } from './adminPanel/admin-team-edit/admin-team-edit.component';
import { AdminPlansEditComponent } from './adminPanel/admin-plans-edit/admin-plans-edit.component';
import { AdminServicesEditComponent } from './adminPanel/admin-services-edit/admin-services-edit.component';
import { NotFoundComponent } from './userPanel/not-found/not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'home', loadChildren: () => import('./userPanel/home/home.module').then(m => m.HomeModule), title: "Mogasoft | Home" },
  { path: 'about', loadChildren: () => import('./userPanel/about/about.module').then(m => m.AboutModule), title: "Mogasoft | About Us" },
  { path: 'blogs/:slug', loadChildren: () => import('./userPanel/blog/blog.module').then(m => m.BlogModule) },
  { path: 'blogs', loadChildren: () => import('./userPanel/blogs/blogs.module').then(m => m.BlogsModule), title: 'Mogasoft | Blogs' },
  { path: 'contact', loadChildren: () => import('./userPanel/contact/contact.module').then(m => m.ContactModule), title: 'Mogasoft | Contact Us' },
  { path: 'hosting', loadChildren: () => import('./userPanel/softwareServices/hosting/hosting.module').then(m => m.HostingModule) },
  { path: 'portfolio', loadChildren: () => import('./userPanel/portfolio/portfolio.module').then(m => m.PortfolioModule), title: 'Mogasoft | Portfolio' },
  { path: 'portfolio/:slug', loadChildren: () => import('./userPanel/project/project.module').then(m => m.ProjectModule) },
  { path: 'projects/:category', loadChildren: () => import('./userPanel/projects-category/projects-category.module').then(m => m.ProjectsCategoryModule) },
  { path: 'qoutation', loadChildren: () => import('./userPanel/qoutation/qoutation.module').then(m => m.QoutationModule), title: "Mogasoft | Get Qoutation" },
  {
    path: "services", children: [
      { path: 'hosting', loadChildren: () => import('./userPanel/softwareServices/hosting/hosting.module').then(m => m.HostingModule), title: "Mogasoft | Hosting Services" },
    ]
  },
  { path: "services/:category", loadChildren: () => import('./userPanel/softwareServices/service/service.module').then(m => m.ServiceModule) },

  { path: "ms-admin", component: AdminLoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminHomeComponent },
      { path: "projects", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminProjectsComponent },
      { path: "projects/edit-project/:id", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminProjectsEditComponent },
      { path: "blogs", data: { roles: ['Admin', 'Marketer'] }, canActivate: [AuthGuard], component: AdminBlogsComponent },
      { path: "blogs/edit-blog/:id", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminBlogsEditComponent },
      { path: "services", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminServicesComponent },
      { path: "services/service-edit/:id", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminServicesEditComponent },
      { path: "reviews", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminReviewsComponent },
      { path: "clients", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminClientsComponent },
      { path: "clients/edit-client/:id", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminClientsEditComponent },
      { path: "team", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminTeamComponent },
      { path: "team/team-edit/:id", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminTeamEditComponent },
      { path: "messages", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminMessagesComponent },
      { path: "quatations", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminQuatationComponent },
      { path: "plans", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminPlansComponent },
      { path: "plans/plan-edit/:id", data: { roles: ['Admin'] }, canActivate: [AuthGuard], component: AdminPlansEditComponent }
    ]
  },
  { path: "not-found", component: NotFoundComponent, title: "Not Found" },
  { path: "**", redirectTo: "/not-found", pathMatch: "full", title: "Not Found!!", }
];

const routerOptions: ExtraOptions = {
  enableTracing: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking', scrollPositionRestoration: "enabled" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
