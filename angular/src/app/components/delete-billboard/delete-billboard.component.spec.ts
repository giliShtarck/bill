import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBillboardComponent } from './delete-billboard.component';

describe('DeleteBillboardComponent', () => {
  let component: DeleteBillboardComponent;
  let fixture: ComponentFixture<DeleteBillboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBillboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBillboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
