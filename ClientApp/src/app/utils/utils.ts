import { HttpHeaders } from "@angular/common/http";

export class Utils {

  static option: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text',
    observe: 'response'
  }

  static requestType: string[] = ['', "Basic", "Autocomplete"];

  public static SortItems(items: Item[], caso: SortCase) {

    items = items.sort(function (a, b) {
      return Utils.Sorter(a, b,caso);
    });
    items.forEach((item: Item) => {
      caso == SortCase.Lidl ? item.ordine = item.ordineLidl : item.ordine = item.ordineAldi;
    });
    return items;
  }

  public static Sorter(a: Item, b: Item, caso: SortCase) {
    let i;
    let j;

    if (caso == SortCase.Aldi) {
      i = a.ordineAldi;
      j = b.ordineAldi;
    }
    else if (caso == SortCase.Lidl) {
      i = a.ordineLidl;
      j = b.ordineLidl;
    }
    if (i == j) {
      if (a.nome.toUpperCase() != b.nome.toUpperCase()) {
        return a.nome.toUpperCase() > b.nome.toUpperCase() ? 1 : a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : 0
      }
    }
    else {
      return i > j ? 1 : i < j ? -1 : 0
    }
  }

  public static CorrectItem(item: Item) {
    if (item.nome == undefined || item.nome == null) item.nome = "";
    if (item.offertaAldi == undefined || item.offertaAldi == null) item.offertaAldi = false;
    if (item.offertaLidl == undefined || item.offertaLidl == null) item.offertaLidl = false;
    if (item.ordineAldi == undefined || item.ordineAldi == null) item.ordineAldi = 0;
    if (item.ordineLidl == undefined || item.ordineLidl == null) item.ordineLidl = 0;
    if (item.prezzo == undefined || item.prezzo == null) item.prezzo = 0;
    if (item.quantita == undefined || item.quantita == null) item.quantita = 0;
  }

  public static AddRange(returnList: Item[], addList: Item[]) {
    for (let i in addList) returnList.push(addList[i]);
    return returnList;
  }
}


export class Item {
  public id: number;
  public nome: string;
  public quantita: number;
  public prezzo: number;
  public offertaLidl: boolean = false;
  public offertaAldi: boolean = false;
  public ordine: number;
  public ordineLidl: number;
  public ordineAldi: number;

  constructor() {

  }

  public Clone(): Item {
    let item = new Item();
    item.id = this.id;
    item.nome = this.nome;
    item.quantita = this.quantita;
    item.prezzo = this.prezzo;
    item.offertaLidl = this.offertaLidl;
    item.offertaAldi = this.offertaAldi;
    item.ordine = this.ordine;
    item.ordineLidl = this.ordineLidl;
    item.ordineAldi = this.ordineAldi;
    return item;
  }
}


export class LoginData {
  public email: string;
  public password: string;
}

export enum Page {
  Lista,
  ListaBase,
  ListaAutocomplete
}

export enum SortCase {
  Lidl,
  Aldi
}
