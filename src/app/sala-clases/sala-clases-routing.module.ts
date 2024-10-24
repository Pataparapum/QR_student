import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalaClasesPage } from './sala-clases.page';

const routes: Routes = [
  {
    path: '',
    component: SalaClasesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaClasesPageRoutingModule {}
