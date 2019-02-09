import { Component, Input, OnInit } from '@angular/core';
import { DeminifiedStackFrameResult, StackFrame } from '../../_models/StackTrace';

@Component({
  selector: 'app-stack-frame',
  templateUrl: './stack-frame.component.html',
  styleUrls: ['./stack-frame.component.css']
})
export class StackFrameComponent implements OnInit {
  @Input() stackFrame: DeminifiedStackFrameResult;

  isCollapsed = true;

  constructor() {
  }

  ngOnInit() {
    // console.log(this.stackFrame);
  }


  isNullOrEmpty(field: string | Array<string>): boolean {
    if (field instanceof Array) {
      for (let i = 0; i < field.length; i++) {
        if (field[i] === undefined || field[i] === '') {
          return true;
        }
      }
      return false;
    } else {
      return (field === undefined || field === '' || field === null);
    }
  }

  getMethodName(): string {
    if (this.stackFrame.DeminificationError === 2) {
      return 'top level call';
    }
    return this.isNullOrEmpty(this.stackFrame.DeminifiedStackFrame.MethodName) ?
      'unknown function' : this.stackFrame.DeminifiedStackFrame.MethodName;
  }

  getFileName(): string {
    let res = this.isNullOrEmpty(this.stackFrame.DeminifiedStackFrame.FilePath) ?
      'unknown file' : this.stackFrame.DeminifiedStackFrame.FilePath;
    res += this.isNullOrEmpty(this.stackFrame.DeminifiedStackFrame.SourceCode) ?
      '' : `:${this.stackFrame.DeminifiedStackFrame.SourcePosition.ZeroBasedLineNumber}:${
        this.stackFrame.DeminifiedStackFrame.SourcePosition.ZeroBasedColumnNumber}`;
    return res;
  }

}
