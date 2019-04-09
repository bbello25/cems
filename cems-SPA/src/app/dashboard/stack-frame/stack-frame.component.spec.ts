import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StackFrameComponent } from './stack-frame.component';

describe('CsharpStackFrameComponent', () => {
  let component: StackFrameComponent;
  let fixture: ComponentFixture<StackFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StackFrameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
