import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { Storage } from "../../utils/Storage";
import { Item, Page, SortCase, Utils } from "../../utils/utils";

@Component({
  selector: 'baseTable',
  templateUrl: './baseTable.component.html',
  styleUrls: ['./baseTable.component.css']
})
export class BaseTableComponent implements OnInit {
  SortCase = SortCase;
  Page = Page;
  items: Item[]=[];
  @Input() page: Page;
  @Output() change = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() select = new EventEmitter<number[]>();
  @Output() sortCaseOutput = new EventEmitter<SortCase>();

  itemSelected: number[] = [];
  sortCase: SortCase = SortCase.Lidl;

  constructor(private storage: Storage, private http: HttpClient) {

  }
  ngOnInit() {
    if (this.storage.items[Utils.requestType[this.page].toLowerCase()].length > 0)
      this.items = this.storage.items[Utils.requestType[this.page].toLowerCase()];
    else {
      this.storage.GetItems(this.http).then(() => this.items = this.storage.items[Utils.requestType[this.page].toLowerCase()])
    }
  }

  changeOrder() {
    this.sortCase == SortCase.Aldi ? this.sortCase = SortCase.Lidl : this.sortCase = SortCase.Aldi;
    Utils.SortItems(this.items, this.sortCase);
    this.sortCaseOutput.emit(this.sortCase);
  }

  selectItem(id: number) {
    //se l'elemento è contenuto nella lista lo elimino, altrimenti lo aggiungo alla lista
    this.itemSelected.includes(id) ?
      this.itemSelected = this.itemSelected.filter(it => it != id) :
      this.itemSelected.push(id);
    //emetto la lista intera
    this.select.emit(this.itemSelected);
  }

  deleteItem(id: number) {
    //emetto il singolo delete
    this.delete.emit(id);
  }

  changeItem(id: number) {
    //emetto l'id dell'elemento da modificare
    this.change.emit(id);
  }
}
