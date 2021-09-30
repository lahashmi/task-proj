import { Component } from '@angular/core';
import { AttachViewRendererComponent } from './components/attach-view-renderer/attach-view-renderer.component';
import { EditDeleteRendererComponent } from './components/edit-delete-renderer/edit-delete-renderer.component';
import { checkDates } from './helpers/date';
import { DataService } from './services/data.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'task-proj';
  columnDefs: Array<Object>;
  rowData: Array<Object> = [];
  frameworkComponents: any;
  isAddVisible: boolean = false;
  record: any = {};
  errorMsg: string = '';
  constructor(
    private _data: DataService,
    private notification: NzNotificationService
  ) {
    this.columnDefs = [
      { field: 'status', headerName: 'STATUS' },
      { field: 'hippaSigned', headerName: 'HIPPA SIGNED' },
      { field: 'hippaExpires', headerName: 'HIPPA EXPIRES' },

      {
        field: 'attachView',
        headerName: 'ATTACH / VIEW',
        cellRenderer: 'attachViewRenderer',
      },
      {
        field: 'editDelete',
        headerName: 'EDIT / DELETE',
        cellRenderer: 'editDeleteRenderer',
      },
    ];

    this.frameworkComponents = {
      editDeleteRenderer: EditDeleteRendererComponent,
      attachViewRenderer: AttachViewRendererComponent,
    };

    this._data.records.subscribe((data) => {
      this.rowData = data.map((record) => {
        return {
          status: record.status,
          hippaExpires: record.hippaExpires,
          hippaSigned: record.hippaSigned,
          editDelete: record.id,
          attachView: record.id,
        };
      });
    });
  }

  showAddModal() {
    this.record = {};
    this.isAddVisible = true;
  }

  handleCancel() {
    this.isAddVisible = false;
  }

  handleSave() {
    if (!this.record.hippaSigned || !this.record.hippaExpires) {
      this._showError('required');
      return;
    }
    if (!checkDates(this.record.hippaSigned, this.record.hippaExpires)) {
      this._showError('invalid');
      return;
    }

    this._data.addRecord(this.record);
    this._createNotification();
    this.isAddVisible = false;
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

  private _createNotification(): void {
    this.notification.create('success', 'Success', 'Record added successfully');
  }
}
