import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StacktraceComponent } from './stacktrace.component';

describe('StacktraceComponent', () => {
  let component: StacktraceComponent;
  let fixture: ComponentFixture<StacktraceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StacktraceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StacktraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
