import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GroupListItem } from '../models/GroupListItem.dto';
import { PaginationResult, Pagination } from 'src/app/_models/Pagination';
import { LogService } from 'src/app/_services/log.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { GroupListQueryParams } from 'src/app/_models/GroupListQueryParams';
import { GroupingReason } from 'src/app/_models/GroupingReason.enum';
import { Platforms } from 'src/app/_models/Platforms.enum';
import { Filter } from 'src/app/_models/Filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  public groups?: GroupListItem[];
  public pagination?: Pagination;

  // public groupColumns = ['id', 'groupingReason', 'firstOccured', 'lastOccured', 'count', 'platform', 'exceptionMessage'];
  public groupColumns = ['groupingReason', 'count', 'platform'];
  public filterTypes = ['equals', 'notEquals', 'greaterThen', 'lessThen', 'contains'];

  items: FormArray;
  filtersForm: FormGroup;

  public queryParams: GroupListQueryParams;

  constructor(private ref: ChangeDetectorRef, private logService: LogService, private formBuilder: FormBuilder, private router: Router) {
    this.filtersForm = this.formBuilder.group({
      filters: this.formBuilder.array([this.formBuilder.group(new Filter())])
    });
    this.queryParams = new GroupListQueryParams();
  }

  ngOnInit() {
    this.logService.getLogGroups(undefined, undefined, this.queryParams)
      .subscribe((res: PaginationResult<GroupListItem[]>) => {
        this.groups = res.result;
        this.pagination = res.pagination;
        this.ref.markForCheck();
      });
  }

  get filters() {
    return this.filtersForm.get('filters') as FormArray;
  }

  addFilter() {
    this.filters.push(this.formBuilder.group(new Filter()));
  }

  deleteFilter(index) {
    this.filters.removeAt(index);
  }

  onSubmit() {
    this.reloadGroups();
  }


  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.reloadGroups();
  }

  private reloadGroups() {
    const filters: Filter[] = [];
    this.filters.controls.forEach((formGroup: FormGroup) => {
      const filterObject: Filter = {
        attribute: formGroup.controls.attribute.value,
        filterType: formGroup.controls.filterType.value,
        filterValue: formGroup.controls.filterValue.value
      };

      filters.push(filterObject);
    });

    this.logService.getLogGroups(this.pagination.currentPage, this.pagination.itemsPerPage, this.queryParams, filters)
      .subscribe((res: PaginationResult<GroupListItem[]>) => {
        this.groups = res.result;
        this.pagination = res.pagination;
        this.ref.markForCheck();
      });
  }

  public getGroupingReason(gropingReason: GroupingReason) {
    return GroupingReason[gropingReason];
  }

  public getPlatform(platform: Platforms) {
    return Platforms[platform];
  }

  public sort(orderBy) {
    if (this.queryParams.orderBy === orderBy) {
      if (this.queryParams.orderByDir === 'desc') {
        this.queryParams.orderByDir = 'asc';
      } else if (this.queryParams.orderByDir === 'asc') {
        this.queryParams.orderByDir = 'desc';
      }
    } else {
      this.queryParams.orderBy = orderBy;
      this.queryParams.orderByDir = 'desc';
    }
    this.reloadGroups();
  }

  redirectToGroupDetail(groupId: number) {
    this.router.navigate(['groupDetail/' + groupId]);
  }

}
