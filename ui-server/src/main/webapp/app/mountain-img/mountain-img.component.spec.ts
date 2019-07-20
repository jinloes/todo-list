import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainImgComponent } from './mountain-img.component';

describe('MountainImgComponent', () => {
  let component: MountainImgComponent;
  let fixture: ComponentFixture<MountainImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MountainImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MountainImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
