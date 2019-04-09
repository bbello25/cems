import { Component, OnInit, Input } from '@angular/core';
import { DeminfiedJsStackFrame } from '../javascript/models/JsStackTrace.model';
import { StackFrame } from 'src/app/_models/StackFrame.model';

@Component({
  selector: 'app-stack-frame',
  templateUrl: './stack-frame.component.html',
  styleUrls: ['./stack-frame.component.css']
})
export class StackFrameComponent implements OnInit {
  @Input() stackFrame: StackFrame | DeminfiedJsStackFrame;

  isCollapsed = true;

  constructor() {}

  ngOnInit() {}

  public getFormatedStackFrame() {
    let formated = 'Invalid stackframe data';
    if (this.stackFrame.file) {
      formated = this.parseFileName(this.stackFrame.file);
    }
    if (this.stackFrame.line) {
      formated += `:${this.stackFrame.line}`;
    }
    if (this.stackFrame.column) {
      formated += `:${this.stackFrame.column}`;
    }
    if (this.stackFrame.method) {
      formated += ` ${this.stackFrame.method}`;
    }
    if (formated === 'Invalid stackframe data' && this.stackFrame instanceof DeminfiedJsStackFrame) {
      return `Deminification error number ${this.stackFrame.deminificationError}`;
    }
    return formated;
  }

  private parseFileName(fullPath: string) {
    const lastSlash = fullPath.lastIndexOf('/');
    const fileName = fullPath.substring(lastSlash + 1);
    return fileName;
  }
}
