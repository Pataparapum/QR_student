import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListadoAlumnosPageRoutingModule } from './listado-alumnos-routing.module';

import { ListadoAlumnosPage } from './listado-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListadoAlumnosPageRoutingModule
  ],
  declarations: [ListadoAlumnosPage]
})
export class ListadoAlumnosPageModule {}
