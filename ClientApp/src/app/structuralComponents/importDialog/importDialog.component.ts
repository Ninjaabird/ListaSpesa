import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Item } from '../../../Angular/utils/utils';
import { Storage } from '../../utils/Storage';
import { Page, SortCase, Utils } from '../../utils/utils';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'importDialog',
  templateUrl: './importDialog.component.html',
  styleUrls: ['./importDialog.component.css']
})
export class ImportDialogComponent implements OnChanges {

  @Input() visible: boolean;

  @Output() onClose = new EventEmitter<void>();

  @Input() sortCase: SortCase = SortCase.Lidl;

  constructor(private storage: Storage, private messageService: MessageService, private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["visible"] != undefined && !changes["visible"].firstChange) {
      this.visible = changes["visible"].currentValue;
    }
    if (changes["sortCase"] != undefined && !changes["sortCase"].firstChange) {
      this.sortCase = changes["sortCase"].currentValue;
    }
  }

  async importBaseList() {
    let resp = await this.storage.ImportBaseList(this.http, this.sortCase);
    if (!resp) this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'C\'è stato un problema' });
    else this.closeDialog();
  }
  //funzione per chiudere il dialog
  closeDialog() {
    this.visible = false;
    this.onClose.emit();
  }
}
