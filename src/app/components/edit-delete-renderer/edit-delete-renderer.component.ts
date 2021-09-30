import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { checkDates } from 'src/app/helpers/date';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'edit-delete-renderer',
  templateUrl: './edit-delete-renderer.component.html',
  styleUrls: ['./edit-delete-renderer.component.scss'],
})
export class EditDeleteRendererComponent
  implements ICellRendererAngularComp, OnDestroy
{
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  private params: any;
  isEditVisible: boolean = false;
  record: any = {};
  errorMsg: string = '';
  agInit(params: any): void {
    this.params = params;
  }
  constructor(
    private _data: DataService,
    private modal: NzModalService,
    private notification: NzNotificationService
  ) {}
  btnClickedHandler(ev: Event) {
    this._getRecord(this.params.value);
    // this.params.clicked(this.params.value);
    this.isEditVisible = true;
  }
  btnClickedHandler2(ev: Event) {
    this.params.clicked(this.params.value);
  }

  handleEditCancel() {
    this.isEditVisible = false;
  }

  handleEditSave() {
    if (!this.record.hippaSigned || !this.record.hippaExpires) {
      this._showError('required');
      return;
    }
    if (!checkDates(this.record.hippaSigned, this.record.hippaExpires)) {
      this._showError('invalid');
      return;
    }
    this._data.editRecord(this.record);
    this.isEditVisible = false;
    this._createNotification('Record updated successfully');
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this record?',
      nzContent: '',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this._data.deleteRecord(this.params.value);
        this._createNotification('Record deleted successfully');
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  private _getRecord(id: number) {
    this.record = this._data.getRecord(id);
  }

  private _showError(type: string) {
    switch (type) {
      case 'required':
        this.errorMsg = 'All fields are required';
        break;
      case 'invalid':
        this.errorMsg = 'Expiry date must be greater than signed date';
        break;
    }

    setTimeout(() => {
      this.errorMsg = '';
    }, 8000);
  }

  private _createNotification(msg: string): void {
    this.notification.create('success', 'Success', msg);
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
