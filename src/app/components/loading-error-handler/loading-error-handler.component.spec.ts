import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingErrorHandlerComponent } from './loading-error-handler.component';

describe('LoadingErrorHandlerComponent', () => {
  let component: LoadingErrorHandlerComponent;
  let fixture: ComponentFixture<LoadingErrorHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingErrorHandlerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingErrorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
