import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryButtonComponent } from './retry-button.component';

describe('RetryButtonComponent', () => {
  let component: RetryButtonComponent;
  let fixture: ComponentFixture<RetryButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RetryButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetryButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
