import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNewFormComponent } from './project-new-form.component';

describe('ProjectNewFormComponent', () => {
  let component: ProjectNewFormComponent;
  let fixture: ComponentFixture<ProjectNewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
