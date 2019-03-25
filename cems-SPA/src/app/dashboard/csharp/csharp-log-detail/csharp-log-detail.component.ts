import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import CsharpErrorLog from './CsharpErrorLog.model';

@Component({
  selector: 'app-csharp-log-detail',
  templateUrl: './csharp-log-detail.component.html',
  styleUrls: ['./csharp-log-detail.component.css']
})
export class CsharpLogDetailComponent implements OnInit {
  public log: CsharpErrorLog;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((log: CsharpErrorLog) => {
      this.log = log;
      console.log(log);
    });
  }
}
