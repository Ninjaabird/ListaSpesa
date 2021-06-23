import { Component, Input, OnInit } from "@angular/core";
import { Item, Page, Utils } from "../utils/utils";
import { HttpClient } from "@angular/common/http";
import { Request } from "../utils/request";

@Component({
  selector: 'app-lista-component-base',
  templateUrl: './listaComponent.component.html',
  styleUrls:['./listaComponent.component.css']
})
export class ListaComponentComponent implements OnInit{
  @Input() page: Page;

  displayNewItemDialog: boolean = false;

  displayChangeItemDialog: boolean = false;

  displayDeleteDialog: boolean = false;

  displayImportDialog: boolean = false;

  deleteItemsId: number[];

  constructor(private http: HttpClient) {

  }

  
  openAddItemDialog() {
    this.displayNewItemDialog = true;
  }

  openImportDialog() {
    this.displayImportDialog = true;
  }

  //callback relativi alla baseTable
  openChangeItemDialog(id: number) {
    this.displayChangeItemDialog = true;
  }

  selectItemCallback(items: number[]) {
    this.deleteItemsId = items;
  }

  openDeleteDialog(listId: number) {
    this.displayDeleteDialog = true;
  }
}
