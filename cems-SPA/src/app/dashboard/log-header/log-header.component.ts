import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CemsLog } from 'src/app/_models/CemsLog.model';

@Component({
  selector: 'app-log-header',
  templateUrl: './log-header.component.html',
  styleUrls: ['./log-header.component.css']
})
export class LogHeaderComponent implements OnInit {
  @Input() log: CemsLog;
  @Input() toggleable: boolean;
  @Output() toggleStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  private isToggled = false;
  constructor() { }

  toggle() {
    this.isToggled = !this.isToggled;
    this.toggleStatus.emit(this.isToggled);
  }

  parseFileName() {
    return 'haha';
  }

  ngOnInit() { }
}
