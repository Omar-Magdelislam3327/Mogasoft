import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopiersComponent } from './copiers.component';

const routes: Routes = [{ path: '', component: CopiersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CopiersRoutingModule { }
