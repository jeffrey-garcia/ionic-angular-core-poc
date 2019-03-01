import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtabAddComponent } from './navtab-add.component';

describe('NavtabAddComponent', () => {
  let component: NavtabAddComponent;
  let fixture: ComponentFixture<NavtabAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavtabAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavtabAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
