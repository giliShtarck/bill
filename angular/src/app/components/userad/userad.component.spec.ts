import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseradComponent } from './userad.component';

describe('UseradComponent', () => {
  let component: UseradComponent;
  let fixture: ComponentFixture<UseradComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseradComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
