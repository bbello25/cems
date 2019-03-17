import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-browser-event',
  templateUrl: './browser-event.component.html',
  styleUrls: ['./browser-event.component.css']
})
export class BrowserEventComponent implements OnInit {
  @Input() eventLog: any;
  isCollapsed = true;
  parser: DOMParser;
  constructor() {
    this.parser = new DOMParser();
  }

  ngOnInit() {}

  getHeader() {
    let res = `Target element <code>${this.eventLog.target.elementName}</code>`;
    if (!this.isNullOrEmpty(this.eventLog.target.id)) {
      res += ` with id <code class="js">${this.eventLog.target.id}</code>`;
    }
    if (!this.isNullOrEmpty(this.eventLog.target.name)) {
      res += ` and name <code class="js">${this.eventLog.target.name}</code>`;
    }
    return res;
  }

  fortmatedTimestamp() {
    return new Date(this.eventLog.timestamp).toLocaleString();
  }

  detailsJson() {
    return `<code class='js'> ${JSON.stringify(this.eventLog, null, 2)}</code>`;
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
      return field === undefined || field === '' || field === null;
    }
  }
}
