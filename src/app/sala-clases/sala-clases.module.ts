import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card'

import { IonicModule } from '@ionic/angular';

import { SalaClasesPageRoutingModule } from './sala-clases-routing.module';

import { SalaClasesPage } from './sala-clases.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalaClasesPageRoutingModule,
    MatCardModule
  ],
  declarations: [SalaClasesPage]
})
export class SalaClasesPageModule {}
