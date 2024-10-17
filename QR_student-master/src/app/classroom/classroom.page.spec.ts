import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassroomPage } from './classroom.page';

describe('ClassroomPage', () => {
  let component: ClassroomPage;
  let fixture: ComponentFixture<ClassroomPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
