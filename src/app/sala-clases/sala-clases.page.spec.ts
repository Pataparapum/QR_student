import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaClasesPage } from './sala-clases.page';

describe('SalaClasesPage', () => {
  let component: SalaClasesPage;
  let fixture: ComponentFixture<SalaClasesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaClasesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
