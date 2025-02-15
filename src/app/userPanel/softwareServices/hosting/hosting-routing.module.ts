import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostingComponent } from './hosting.component';

const routes: Routes = [{ path: '', component: HostingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HostingRoutingModule { }
