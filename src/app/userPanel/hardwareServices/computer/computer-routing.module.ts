import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerComponent } from './computer.component';

const routes: Routes = [{ path: '', component: ComputerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComputerRoutingModule { }
