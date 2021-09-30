import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { EditDeleteRendererComponent } from './components/edit-delete-renderer/edit-delete-renderer.component';
import { AttachViewRendererComponent } from './components/attach-view-renderer/attach-view-renderer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

import {
  EditFill,
  DeleteFill,
  PlusOutline,
  EyeFill,
  PaperClipOutline,
} from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { HttpClientModule } from '@angular/common/http';

const icons: IconDefinition[] = [
  EditFill,
  DeleteFill,
  EyeFill,
  PlusOutline,
  PaperClipOutline,
];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    EditDeleteRendererComponent,
    AttachViewRendererComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([
      EditDeleteRendererComponent,
      AttachViewRendererComponent,
    ]),
    HttpClientModule,
    NzButtonModule,
    NzIconModule.forChild(icons),
    NzToolTipModule,
    NzModalModule,
    NzDatePickerModule,
    NzGridModule,
    NzUploadModule,
    NzMessageModule,
    NzNotificationModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
