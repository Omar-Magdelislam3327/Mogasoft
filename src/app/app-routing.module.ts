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

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: 'home', loadChildren: () => import('./userPanel/home/home.module').then(m => m.HomeModule), title: "Mogasoft | Home" },
  { path: 'about', loadChildren: () => import('./userPanel/about/about.module').then(m => m.AboutModule), title: "Mogasoft | About Us" },
  { path: 'blog/:id', loadChildren: () => import('./userPanel/blog/blog.module').then(m => m.BlogModule) },
  { path: 'blogs', loadChildren: () => import('./userPanel/blogs/blogs.module').then(m => m.BlogsModule), title: 'Mogasoft | Blogs' },
  { path: 'contact', loadChildren: () => import('./userPanel/contact/contact.module').then(m => m.ContactModule), title: 'Mogasoft | Contact Us' },
  { path: 'hosting', loadChildren: () => import('./userPanel/softwareServices/hosting/hosting.module').then(m => m.HostingModule) },
  { path: 'portfolio', loadChildren: () => import('./userPanel/portfolio/portfolio.module').then(m => m.PortfolioModule), title: 'Mogasoft | Portfolio' },
  { path: 'project/:id', loadChildren: () => import('./userPanel/project/project.module').then(m => m.ProjectModule) },
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
    children: [
      { path: 'home', canActivate: [AuthGuard], component: AdminHomeComponent },
      { path: "projects", canActivate: [AuthGuard], component: AdminProjectsComponent },
      { path: "blogs", canActivate: [AuthGuard], component: AdminBlogsComponent },
      { path: "services", canActivate: [AuthGuard], component: AdminServicesComponent },
      { path: "reviews", canActivate: [AuthGuard], component: AdminReviewsComponent },
      { path: "clients", canActivate: [AuthGuard], component: AdminClientsComponent },
      { path: "team", canActivate: [AuthGuard], component: AdminTeamComponent },
      { path: "messages", canActivate: [AuthGuard], component: AdminMessagesComponent },
      { path: "quatations", canActivate: [AuthGuard], component: AdminQuatationComponent },
      { path: "plans", canActivate: [AuthGuard], component: AdminPlansComponent }
    ]
  },
  { path: "**", redirectTo: "/home", pathMatch: "full" }
];

const routerOptions: ExtraOptions = {
  enableTracing: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
