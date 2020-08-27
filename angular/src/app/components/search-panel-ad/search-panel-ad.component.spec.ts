import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelAdComponent } from './search-panel-ad.component';

describe('SearchPanelAdComponent', () => {
  let component: SearchPanelAdComponent;
  let fixture: ComponentFixture<SearchPanelAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
