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
  { path: 'about', loadChildren: () => import('./userPanel/about/about.module').then(m => m.AboutModule) },
  { path: 'blog/:id', loadChildren: () => import('./userPanel/blog/blog.module').then(m => m.BlogModule) },
  { path: 'blogs', loadChildren: () => import('./userPanel/blogs/blogs.module').then(m => m.BlogsModule) },
  { path: 'contact', loadChildren: () => import('./userPanel/contact/contact.module').then(m => m.ContactModule) },
  { path: 'home', loadChildren: () => import('./userPanel/home/home.module').then(m => m.HomeModule) },
  { path: 'hosting', loadChildren: () => import('./userPanel/softwareServices/hosting/hosting.module').then(m => m.HostingModule) },
  { path: 'portfolio', loadChildren: () => import('./userPanel/portfolio/portfolio.module').then(m => m.PortfolioModule) },
  { path: 'project/:id', loadChildren: () => import('./userPanel/project/project.module').then(m => m.ProjectModule) },
  { path: 'projects/:category', loadChildren: () => import('./userPanel/projects-category/projects-category.module').then(m => m.ProjectsCategoryModule) },
  { path: 'qoutation', loadChildren: () => import('./userPanel/qoutation/qoutation.module').then(m => m.QoutationModule) },
  // {
  //   path: "software", children: [
  //     { path: 'web', loadChildren: () => import('./userPanel/softwareServices/service/service.module').then(m => m.ServiceModule) },
  //     { path: "mobile", loadChildren: () => import('./userPanel/softwareServices/mobile/mobile.module').then(m => m.MobileModule) },
  //     { path: 'hosting', loadChildren: () => import('./userPanel/softwareServices/hosting/hosting.module').then(m => m.HostingModule) },
  //     { path: "digital-markting", loadChildren: () => import('./userPanel/softwareServices/digital/digital.module').then(m => m.DigitalModule) },
  //   ]
  // },
  { path: "servcies/:category", loadChildren: () => import('./userPanel/softwareServices/service/service.module').then(m => m.ServiceModule) },
  {
    path: "hardware", children: [
      { path: "surveillance-cameras", loadChildren: () => import('./userPanel/hardwareServices/cameras/cameras.module').then(m => m.CamerasModule) },
      { path: "computers", loadChildren: () => import('./userPanel/hardwareServices/computer/computer.module').then(m => m.ComputerModule) },
      { path: "copiers", loadChildren: () => import('./userPanel/hardwareServices/copiers/copiers.module').then(m => m.CopiersModule) },
      { path: "network", loadChildren: () => import('./userPanel/hardwareServices/network/network.module').then(m => m.NetworkModule) },
      { path: "fire-fighing", loadChildren: () => import('./userPanel/hardwareServices/fire/fire.module').then(m => m.FireModule) },
      { path: "queue-serve", loadChildren: () => import('./userPanel/hardwareServices/queue/queue.module').then(m => m.QueueModule) }
    ]
  },
  { path: 'services', loadChildren: () => import('./userPanel/services/services.module').then(m => m.ServicesModule) },
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
