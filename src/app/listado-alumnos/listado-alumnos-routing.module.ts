import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListadoAlumnosPage } from './listado-alumnos.page';

const routes: Routes = [
  {
    path: '',
    component: ListadoAlumnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListadoAlumnosPageRoutingModule {}
