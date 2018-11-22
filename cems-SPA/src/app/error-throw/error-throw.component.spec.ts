import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorThrowComponent } from './error-throw.component';

describe('ErrorThrowComponent', () => {
  let component: ErrorThrowComponent;
  let fixture: ComponentFixture<ErrorThrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorThrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorThrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
