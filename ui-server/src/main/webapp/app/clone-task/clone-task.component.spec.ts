import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneTaskComponent } from './clone-task.component';

describe('CloneTaskComponent', () => {
  let component: CloneTaskComponent;
  let fixture: ComponentFixture<CloneTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloneTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
