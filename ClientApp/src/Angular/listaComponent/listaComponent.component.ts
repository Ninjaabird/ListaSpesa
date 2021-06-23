import { Component, Input, OnInit } from "@angular/core";
import { Item, Utils } from "../utils/utils";
import { HttpClient } from "@angular/common/http";
import { Request } from "../utils/request";

@Component({
  selector: 'app-lista-component-base',
  templateUrl: './listaComponent.component.html',
  styleUrls:['./listaComponent.component.css']
})
export class ListaComponentComponent implements OnInit{
  @Input() page: string;

  items: Item[] = [];

  autocompleteItem: Item = new Item();

  currentItem: Item = new Item();

  sendRequestError: boolean = false;

  displayItemDialog: boolean = false;

  displayDeleteDialog: boolean = false;

  displayImportDialog: boolean = false;

  sortCase: number = 1;

  suggestedItems: Item[] = [];

  suggestedString: string[] = [];

  new: boolean = false;

  constructor(private http: HttpClient) {
    
  }


  ngOnInit() {
    let type;
    this.page == 'Autocomplete' ? type = 'AllAutocomplete' : type = this.page;
    Request.GetItems(type, this.http).then((value) => {
      this.items = value;
      this.items = Utils.SortItems(this.items, this.sortCase);
    });
  }

  changeOrder() {
    this.sortCase == 1 ? this.sortCase = 2 : this.sortCase = 1;
    this.items = Utils.SortItems(this.items, this.sortCase);
  }

  openItemDialog(item?: Item) {
    if (item == null) {
      this.new = true;
      this.currentItem = new Item();
      this.autocompleteItem = new Item();
    }
    else {
      this.new = false;
      this.currentItem = item;
      this.autocompleteItem = item;
    }
    this.displayItemDialog = true;
  }

  openDeleteDialog(item: Item) {
    this.currentItem = item;
    this.displayDeleteDialog=true;
  }

  addItem() {

    this.sendRequestError = false;
    this.autocompleteWorkaround();
    Request.StoreItem(this.page, this.http, this.currentItem).then((value) => {
      if (value > 0) {
        this.currentItem.id = value;
        this.items.push(this.currentItem);
        this.currentItem = new Item();
        this.autocompleteItem = new Item();
        this.items = Utils.SortItems(this.items, this.sortCase);
      }
      else {
        this.sendRequestError = true;
      }
    });
  }

  EditItem() {

    this.sendRequestError = false;
    this.autocompleteWorkaround();
    Request.EditItem(this.page, this.http, this.currentItem).then((value) => {
      if (value) {
        let id = this.items.findIndex(a => a.id == this.currentItem.id);
        this.items[id] = this.currentItem;
        this.currentItem = new Item();
        this.autocompleteItem = new Item();
        this.displayItemDialog = false;
        this.items = Utils.SortItems(this.items, this.sortCase);
      }
      else {
        this.sendRequestError = true;
      }
    });
  }

  DeleteItem() {

    this.sendRequestError = false;
    Request.DeleteItem(this.page, this.http, this.currentItem).then((value) => {
      if (value) {
        this.items.splice(this.items.findIndex(a => a.id == this.currentItem.id), 1);
        this.currentItem = new Item();
        this.displayDeleteDialog = false;
      }
      else {
        this.sendRequestError = true;
      }
    }).catch(e=>console.log(e));
  }

  async searchForItems() {
    let value;
    this.suggestedString = [];
    try {
      value = await this.http.post("GetAutocompleteItems", JSON.stringify(this.autocompleteItem), Utils.option).toPromise();
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.suggestedItems = JSON.parse(value.body);
    }
  }

  autocompleteWorkaround() {
    if (this.currentItem.nome == "" || this.currentItem.nome == null) {
      this.currentItem.nome = this.autocompleteItem.toString();
    }
  }

  selectTheItem(event) {
    this.currentItem = event;
    this.new ? this.currentItem.id = 0 : null;
  }
  
  importBasicList() {
    this.http.post("BasicListToItemList", null, Utils.option).toPromise().then((value) => {
      if (value) {
        Request.GetItems(this.page, this.http).then((value) => {
          this.items = value;
          this.items = Utils.SortItems(this.items, this.sortCase);
        });
        this.displayImportDialog = false;
      }
      else {
        this.sendRequestError = true;
      }
    });
  }
}
