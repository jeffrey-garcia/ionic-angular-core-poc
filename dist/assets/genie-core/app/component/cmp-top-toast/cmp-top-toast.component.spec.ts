import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmpTopToastComponent } from './cmp-top-toast.component';

describe('CmpTopToastComponent', () => {
  let component: CmpTopToastComponent;
  let fixture: ComponentFixture<CmpTopToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmpTopToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmpTopToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
