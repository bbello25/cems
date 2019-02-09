import { Component, Input, OnInit } from '@angular/core';
import { StackFrame } from '../../_models/StackTrace';

@Component({
  selector: 'app-minified-stack-frame',
  templateUrl: './minified-stack-frame.component.html',
  styleUrls: ['./minified-stack-frame.component.css']
})
export class MinifiedStackFrameComponent implements OnInit {
  @Input() stackFrame: StackFrame;

  constructor() {
  }

  ngOnInit() {
  }


  getMethodName(): string {
    return this.isNullOrEmpty(this.stackFrame.MethodName) ?
      'unknown function' : this.stackFrame.MethodName;
  }

  getFileName(): string {
    let res = this.isNullOrEmpty(this.stackFrame.FilePath) ?
      'unknown file' : this.stackFrame.FilePath;
    res += this.isNullOrEmpty(this.stackFrame.SourceCode) ?
      '' : `:${this.stackFrame.SourcePosition.ZeroBasedLineNumber}:${
        this.stackFrame.SourcePosition.ZeroBasedColumnNumber}`;
    return res;
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

}
