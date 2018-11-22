import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  public active = false;
  public body: string;
  public title: string;
  public onClose: Subject<boolean>;

  public constructor(
    private _bsModalRef: BsModalRef
  ) { }

  public ngOnInit(): void {
    this.onClose = new Subject();
  }

  public showConfirmationModal(title: string, body: string): void {
    this.title = title;
    this.body =  body;
    this.active = true;
  }

  public onConfirm(): void {
    this.active = false;
    this.onClose.next(true);
    this._bsModalRef.hide();
  }

  public onCancel(): void {
    this.active = false;
    this.onClose.next(false);
    this._bsModalRef.hide();
  }

  public hideConfirmationModal(): void {
    this.active = false;
    this.onClose.next(null);
    this._bsModalRef.hide();
  }

}
