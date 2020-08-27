import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillboardComponent } from './add-billboard.component';

describe('AddBillboardComponent', () => {
  let component: AddBillboardComponent;
  let fixture: ComponentFixture<AddBillboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBillboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBillboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
