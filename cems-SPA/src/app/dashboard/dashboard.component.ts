import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LogService } from '../_services/log.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginationResult } from '../_models/Pagination';
import { AlertifyService } from '../_services/alertify.service';
import { CemsLog } from '../_models/CemsLog.model';
import { Platforms } from '../_models/Platforms.enum';
import { GroupListItem } from './models/GroupListItem.dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
