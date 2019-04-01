import { Component, OnInit, Input } from '@angular/core';
import { CsharpStackFrame } from '../models/CsharpStackTrace.model';

@Component({
  selector: 'app-csharp-stack-frame',
  templateUrl: './csharp-stack-frame.component.html',
  styleUrls: ['./csharp-stack-frame.component.css']
})
export class CsharpStackFrameComponent implements OnInit {
  @Input() stackFrame: CsharpStackFrame;

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
    return formated;
  }

  private parseFileName(fullPath: string) {
    const lastSlash = fullPath.lastIndexOf('/');
    const fileName = fullPath.substring(lastSlash + 1);
    return fileName;
  }
}
