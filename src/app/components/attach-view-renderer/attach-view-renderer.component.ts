import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
@Component({
  selector: 'attach-view-renderer',
  templateUrl: './attach-view-renderer.component.html',
  styleUrls: ['./attach-view-renderer.component.scss'],
})
export class AttachViewRendererComponent
  implements ICellRendererAngularComp, OnDestroy
{
  refresh(params: ICellRendererParams): boolean {
    throw new Error('Method not implemented.');
  }

  constructor(private msg: NzMessageService) {}
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler(ev: Event) {
    console.log(this.params.value);
  }

  handleChange(info: NzUploadChangeParam) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.msg.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      this.msg.error(`${info.file.name} file upload failed.`);
    }
  }

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}
