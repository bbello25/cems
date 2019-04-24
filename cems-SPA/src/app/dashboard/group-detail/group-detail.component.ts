import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LogService } from 'src/app/_services/log.service';
import { ActivatedRoute } from '@angular/router';
import { GroupListItem } from '../models/GroupListItem.dto';
import { GroupingReason } from 'src/app/_models/GroupingReason.enum';
import { Platforms } from 'src/app/_models/Platforms.enum';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
  group?: GroupListItem;

  constructor(private logService: LogService, private ref: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.group = data.group;
      this.ref.markForCheck();
    });

  }

  public getGroupingReason(gropingReason: GroupingReason) {
    return GroupingReason[gropingReason];
  }

  public getPlatform(platform: Platforms) {
    return Platforms[platform];
  }

}
