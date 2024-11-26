import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoAlumnosPage } from './listado-alumnos.page';

describe('ListadoAlumnosPage', () => {
  let component: ListadoAlumnosPage;
  let fixture: ComponentFixture<ListadoAlumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoAlumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
