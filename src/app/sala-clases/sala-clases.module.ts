import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalaClasesPageRoutingModule } from './sala-clases-routing.module';

import { SalaClasesPage } from './sala-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaClasesPageRoutingModule
  ],
  declarations: [SalaClasesPage]
})
export class SalaClasesPageModule {}
