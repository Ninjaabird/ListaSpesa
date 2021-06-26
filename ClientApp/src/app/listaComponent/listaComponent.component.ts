import { Component, Input, OnInit } from "@angular/core";
import { Item, Page, Utils } from "../utils/utils";
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

  constructor(private http: HttpClient) {

  }
  
  openAddItemDialog() {
    this.changeItemId = 0;
    this.displayItemDialog = !this.displayItemDialog;
  }

  openImportDialog() {
    this.displayImportDialog = true;
  }

  openDeleteSelectedItems() {
    this.displayDeleteDialog = true;
  }

  openTransferDialog() {
    this.displayTransferDialog = true;
  }

  onCloseAddDialog() {
    this.displayItemDialog = false;
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
