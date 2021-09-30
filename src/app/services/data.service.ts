import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { formatDate } from '../helpers/date';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public records = new BehaviorSubject<Array<Record>>([]);
  private _records: Array<Record> = [];
  constructor() {
    this.initData();
  }
  private initData() {
    this._records = [
      {
        id: new Date().getTime(),
        status: 'Active',
        hippaSigned: '04/24/2021',
        hippaExpires: '04/24/2022',
      },
      {
        id: new Date().getTime() + 2,
        status: 'Active',
        hippaSigned: '05/24/2021',
        hippaExpires: '05/24/2022',
      },
      {
        id: new Date().getTime() + 4,
        status: 'Active',
        hippaSigned: '06/24/2021',
        hippaExpires: '06/24/2022',
      },
    ];
    this.records.next(this._records);
  }

  public getRecord(id: number) {
    return this._records.find((record) => record.id === id);
  }

  public addRecord(data: any) {
    const item = {
      status: 'Active',
      id: new Date().getTime(),
      hippaSigned: formatDate(data.hippaSigned),
      hippaExpires: formatDate(data.hippaExpires),
    };
    this._records.push(item);
    this.records.next(this._records);
  }
  public editRecord(data: any) {
    const index = this._records.findIndex((record) => record.id === data.id);
    if (index > -1) {
      this._records[index] = {
        ...data,
        hippaSigned: formatDate(data.hippaSigned),
        hippaExpires: formatDate(data.hippaExpires),
      };
      this.records.next(this._records);
    }
  }
  public deleteRecord(id: any) {
    console.log('Deleting Record: ' + id);
    const index = this._records.findIndex((record) => record.id === id);
    console.log(index);
    if (index > -1) {
      this._records.splice(index, 1);
      this.records.next(this._records);
    }
  }
}

interface Record {
  id: number;
  status: string;
  hippaSigned: string;
  hippaExpires: string;
}
