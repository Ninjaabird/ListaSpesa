import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Request } from "./request";
import { Page, Utils, Item, SortCase } from "./utils";

@Injectable()
export class Storage {
  public items: object = {
    '': [],
    'basic': [],
    'autocomplete': []
  };
  public itemList: Item[] = [];

  public async GetItems(http: HttpClient): Promise<void> {
    this.items[''] = await Request.GetItems('', http);
    this.items['basic'] = await Request.GetItems('Basic', http);
    this.items['autocomplete'] = await Request.GetItems('AllAutocomplete', http);
    Utils.SortItems(this.items[''], SortCase.Lidl);
    Utils.SortItems(this.items['basic'], SortCase.Lidl);
    Utils.SortItems(this.items['autocomplete'], SortCase.Lidl);
  }

  public async ImportBaseList(http: HttpClient) {
    let res = await Request.ImportBaseList(http);
    if (res) {
      let list = this.items['basic'].filter(it => !this.items[''].includes(this.items[''].find(val=>val.nome==it.nome)));
      for (let i in list) this.items[''].push(list[i]);
      
    }
    return res;
  }
  public async AddItem(item: Item, page: Page, http: HttpClient) {
    let id = await Request.StoreItem(Utils.requestType[page], http, item);
    if (id > 0) {
      item.id = id;
      this.items[Utils.requestType[page].toLowerCase()].push(item);
      return true;
    }
    else return false;
  }
  public async EditItem(item: Item, page: Page, http: HttpClient) {
    let res = await Request.EditItem(Utils.requestType[page], http, item);
    if (res) {
      let i = this.items[Utils.requestType[page].toLowerCase()].findIndex((it) => it.id == item.id);
      this.items[Utils.requestType[page].toLowerCase()][i] = item;
    }
    return res;
  }

  public async DeleteItems(idList: number[], page: Page, http: HttpClient) {
    let res = await Request.DeleteItem(Utils.requestType[page], http, idList);
    for (let i in res) {
      if (res[i]) {
        let index = this.items[Utils.requestType[page].toLowerCase()].findIndex((it) => it.id == idList[i]);
        this.items[Utils.requestType[page].toLowerCase()].splice(index,1);
      }
    }
    return res;
  }
}
