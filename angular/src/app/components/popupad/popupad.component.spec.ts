import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupadComponent } from './popupad.component';

describe('PopupadComponent', () => {
  let component: PopupadComponent;
  let fixture: ComponentFixture<PopupadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
