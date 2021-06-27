import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../../Angular/utils/utils';
import { Storage } from '../../utils/Storage';
import { Page, Utils } from '../../utils/utils';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'transferDialog',
  templateUrl: './transferDialog.component.html',
  styleUrls: ['./transferDialog.component.css']
})
export class TransferDialogComponent implements OnChanges {

  @Input() visible: boolean;

  @Input() deleteIds: number[] = [];

  @Input() page: Page;

  items: Item[];

  @Output() onClose = new EventEmitter<void>();

  constructor(private storage: Storage, private messageService: MessageService, private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["visible"] != undefined && !changes["visible"].firstChange) {
      this.visible = changes["visible"].currentValue;
    }
    if (changes["deleteIds"] != undefined && !changes["deleteIds"].firstChange) {
      this.deleteIds = changes["deleteIds"].currentValue;
    }
    this.items = this.storage.items[Utils.requestType[this.page].toLowerCase()].filter((it: Item) => this.deleteIds.includes(it.id));
    console.log(this.items);
  }

  async deleteItems() {
    let resp = await this.storage.DeleteItems(this.deleteIds, this.page, this.http)
    if (resp.includes(false)) this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'Non è stato possibile eliminare qualche elemento' });
    else this.closeDialog();
  }
  //funzione per chiudere il dialog
  closeDialog() {
    this.visible = false;
    this.onClose.emit();
  }
}
