import { Component, Input, OnInit } from "@angular/core";
import { Item, Page, SortCase, Utils } from "../utils/utils";
import { HttpClient } from "@angular/common/http";
import { Request } from "../utils/request";
import { Storage } from "../utils/Storage";

@Component({
  selector: 'app-lista-component-base',
  templateUrl: './listaComponent.component.html',
  styleUrls:['./listaComponent.component.css']
})
export class ListaComponentComponent {
  Page = Page;

  @Input() page: Page;

  displayItemDialog: boolean = false;

  displayDeleteDialog: boolean = false;

  displayImportDialog: boolean = false;

  displayTransferDialog: boolean = false;

  deleteItemsId: number[]=[];

  singleItemId: number;

  changeItemId: number;

  sortCase: SortCase = SortCase.Lidl;

  constructor(private http: HttpClient, private storage: Storage) {

  }

  openAddItemDialog() {
    this.changeItemId = 0;
    this.displayItemDialog = !this.displayItemDialog;
    this.storage.SortAll(this.sortCase);
  }

  openImportDialog() {
    this.displayImportDialog = true;
    this.storage.SortAll(this.sortCase);
  }

  openDeleteSelectedItems() {
    this.displayDeleteDialog = true;
    this.storage.SortAll(this.sortCase);
  }

  openTransferDialog() {
    this.displayTransferDialog = true;
    this.storage.SortAll(this.sortCase);
  }

  onCloseAddDialog() {
    this.displayItemDialog = false;
    this.storage.SortAll(this.sortCase);
  }

  //callback relativi alla baseTable
  openChangeItemDialog(id: number) {
    this.displayItemDialog = true;
    this.changeItemId = id;
  }

  selectItemCallback(items: number[]) {
    this.deleteItemsId = items;
  }

  openDeleteDialog(id: number) {
    this.displayDeleteDialog = true;
    this.singleItemId = id;
  }
}
