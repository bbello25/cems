import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ErrorLog } from '../../_models/ErrorLog';
import { LogService } from '../../_services/log.service';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogListComponent implements OnInit {
  @Input()
  logs: ErrorLog[];
  constructor() {}

  ngOnInit() {}
}
