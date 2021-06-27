import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Storage } from "../../utils/Storage";
import { Item, Page, Utils } from "../../utils/utils";
import { MessageService } from 'primeng/api';
import { Request } from "../../utils/request";

@Component({
  selector: 'addOrChangeDialog',
  templateUrl: './addOrChangeDialog.component.html',
  styleUrls: ['./addOrChangeDialog.component.css']
})
export class AddOrChangeDialogComponent implements OnChanges {

  @Input() visible: boolean;
  @Input() id: number;

  @Input() page: Page;

  @Output() onClose = new EventEmitter<void>();

  item: Item;

  searchedItems: Item[];

  constructor(private storage: Storage, private http: HttpClient, private messageService: MessageService) { }

  ngOnInit() {
    if (this.id != undefined && this.id != 0) this.item = this.storage.items[Utils.requestType[this.page]].find(it => it.id == this.id);
    else this.item = new Item();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["visible"] != undefined && !changes["visible"].firstChange) {
      this.visible = changes["visible"].currentValue;
    }
    if (changes["id"] != undefined && !changes["id"].firstChange) {
      this.id = changes["id"].currentValue;
    }
    if (this.id != undefined && this.id != 0) this.item = this.storage.items[Utils.requestType[this.page]].find(it => it.id == this.id);
    else this.item = new Item();
  }

  //funzione per aggiungere un item
  async addItem() {
    Utils.CorrectItem(this.item);
    let resp = await this.storage.AddItem(this.item, this.page, this.http);
    if (resp) {
      this.onClose.emit();
      this.visible = false;
    }
    else this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'C\'è stato un problema' })
  }

  //funzione per editare l'item selezionato
  async editItem() {
    Utils.CorrectItem(this.item);
    let resp = await this.storage.EditItem(this.item, this.page, this.http);
    if (resp) this.closeDialog();
    else this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'C\'è stato un problema'})
  }

  //funzione per cercare gli item per l'autocomplete
  searchForItems(event: any) {
    this.item.nome = event;
    Request.GetAutocompleteItems(this.http, event).then((val) => this.searchedItems = val);
  }

  selectTheItem(event: any) {
    this.item = event;
  }

  //funzione per chiudere il dialog
  closeDialog() {
    this.visible = false;
    this.onClose.emit();
  }
}
