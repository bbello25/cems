import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinifiedStackFrameComponent } from './minified-stack-frame.component';

describe('MinifiedStackFrameComponent', () => {
  let component: MinifiedStackFrameComponent;
  let fixture: ComponentFixture<MinifiedStackFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinifiedStackFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinifiedStackFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
