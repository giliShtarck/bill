import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAdvertismentComponent } from './search-advertisment.component';

describe('SearchAdvertismentComponent', () => {
  let component: SearchAdvertismentComponent;
  let fixture: ComponentFixture<SearchAdvertismentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAdvertismentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAdvertismentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
