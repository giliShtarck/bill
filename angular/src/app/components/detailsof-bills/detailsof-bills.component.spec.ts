import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsofBillsComponent } from './detailsof-bills.component';

describe('DetailsofBillsComponent', () => {
  let component: DetailsofBillsComponent;
  let fixture: ComponentFixture<DetailsofBillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsofBillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsofBillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
