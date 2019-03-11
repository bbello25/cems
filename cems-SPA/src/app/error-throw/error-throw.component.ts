import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-throw',
  templateUrl: './error-throw.component.html',
  styleUrls: ['./error-throw.component.css']
})
export class ErrorThrowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public throwError() {
    throw new Error(' test error');
  }

}
