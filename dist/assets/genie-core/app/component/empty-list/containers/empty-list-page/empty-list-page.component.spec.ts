import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyListPageComponent } from './empty-list-page.component';

describe('EmptyListPageComponent', () => {
  let component: EmptyListPageComponent;
  let fixture: ComponentFixture<EmptyListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
