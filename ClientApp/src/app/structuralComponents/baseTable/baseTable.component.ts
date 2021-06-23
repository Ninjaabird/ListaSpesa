import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { Storage } from "../../utils/Storage";
import { Item, Page } from "../../utils/utils";

@Component({
  selector: 'baseTable',
  templateUrl: './baseTable.component.html',
  styleUrls: ['./baseTable.component.css']
})
export class BaseTableComponent implements OnChanges {
  Page = Page;
  @Input() items: Item[];
  @Input() page: Page;
  @Output() change = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number[]>();
  @Output() select = new EventEmitter<number[]>();

  itemSelected : number[] = [];

  constructor(private storage: Storage) {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["items"] !== undefined && !changes["items"].firstChange) {
      this.items = changes["items"].currentValue;
    }
  }

  selectItem(id: number) {
    //se l'elemento è contenuto nella lista lo elimino, altrimenti lo aggiungo alla lista
    this.itemSelected.includes(id) ? this.itemSelected = this.itemSelected.filter(it => it == id) : this.itemSelected.push(id);
    //emetto la lista intera
    this.select.emit(this.itemSelected);
  }

  deleteItem(id: number) {
    //emetto il singolo delete
    this.delete.emit([id]);
  }

  changeItem(id: number) {
    //emetto l'id dell'elemento da modificare
    this.change.emit(id);
  }
}
