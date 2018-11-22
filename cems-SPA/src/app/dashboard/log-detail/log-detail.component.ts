import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ErrorLog } from 'src/app/_models/ErrorLog';
import { ActivatedRoute } from '@angular/router';
import { LogService } from 'src/app/_services/log.service';
import { Observable } from 'rxjs';
import { BrowserErrorLog } from 'src/app/_models/BrowserErrorLog';
import { BrowserError } from 'protractor/built/exitCodes';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogDetailComponent implements OnInit {
  log$: Observable<BrowserErrorLog> | Observable<ErrorLog>;
  id: number;

  constructor(private logService: LogService, private route: ActivatedRoute) {
  }

  isBrowserError(): boolean {
    return true;
    /*let _isBrowserError: boolean = false;
    this.log$.subscribe(res => _isBrowserError = (res instanceof BrowserErrorLog));
    return _isBrowserError;*/
  }

  isNullOrEmpty(field: string | Array<string>): boolean {
    if (field instanceof Array) {
      for (const _field in field) {
        if (_field === undefined || _field === '') {
          return false;
        }
      }
      return true;
    } else {
      return (field === undefined || field === '');
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.log$ = this.logService.getLog(this.id);
    // this.log$.subscribe(log => console.log(log));
  }
}
