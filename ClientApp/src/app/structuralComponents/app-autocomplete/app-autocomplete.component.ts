import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Item } from '../../utils/utils';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './app-autocomplete.component.html',
  styleUrls: ['./app-autocomplete.component.css']
})
export class AppAutocompleteComponent implements OnChanges {

  @Input() items: Item[]=[];
  @Output() onItemSelect = new EventEmitter<Item>();
  @Output() buttonPressedCallBack = new EventEmitter<string>();

  @Input() text: string;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["items"] != undefined && !changes["items"].firstChange) {
      this.items = changes["items"].currentValue;
    }
  }

  itemSelected(item: Item) {
    this.items = [];
    this.text = item.nome;
    this.onItemSelect.emit(item);
  }

  onKeyUp() {
    if (this.text != "") this.buttonPressedCallBack.emit(this.text);
    else this.items = [];
  }

}
