import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomPage } from './classroom.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomPageRoutingModule {}
