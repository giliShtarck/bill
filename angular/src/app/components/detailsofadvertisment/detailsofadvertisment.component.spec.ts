import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsofadvertismentComponent } from './detailsofadvertisment.component';

describe('DetailsofadvertismentComponent', () => {
  let component: DetailsofadvertismentComponent;
  let fixture: ComponentFixture<DetailsofadvertismentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsofadvertismentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsofadvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
