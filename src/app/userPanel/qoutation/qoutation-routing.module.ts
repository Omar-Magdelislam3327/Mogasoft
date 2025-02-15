import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QoutationComponent } from './qoutation.component';

const routes: Routes = [{ path: '', component: QoutationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QoutationRoutingModule { }
