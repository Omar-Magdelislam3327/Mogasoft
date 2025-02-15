import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsCategoryComponent } from './projects-category.component';

const routes: Routes = [{ path: '', component: ProjectsCategoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsCategoryRoutingModule { }
