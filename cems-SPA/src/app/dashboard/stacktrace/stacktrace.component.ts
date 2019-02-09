import { Component, Input, OnInit } from '@angular/core';
import { StackFrame, StackTrace } from '../../_models/StackTrace';

@Component({
  selector: 'app-stacktrace',
  templateUrl: './stacktrace.component.html',
  styleUrls: ['./stacktrace.component.css']
})
export class StacktraceComponent implements OnInit {
  @Input() stackTrace: StackTrace;


  constructor() {
  }

  ngOnInit() {
    // console.log(this.stackTrace);
  }

  emptyFrame(stackFrame: StackFrame): boolean {
    return !(stackFrame.SourcePosition || stackFrame.SourceCode || stackFrame.FilePath || stackFrame.MethodName);
  }
}
