import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CsharpStackFrameComponent } from './csharp-stack-frame.component';

describe('CsharpStackFrameComponent', () => {
  let component: CsharpStackFrameComponent;
  let fixture: ComponentFixture<CsharpStackFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CsharpStackFrameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpStackFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
