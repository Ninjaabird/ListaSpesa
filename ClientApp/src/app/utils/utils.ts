import { HttpHeaders } from "@angular/common/http";

export class Utils {

  static option: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text',
    observe: 'response'
  }

  public static SortItems(items: Item[], caso: number) {

    items = items.sort(function (a, b) {
      return Utils.Sorter(a, b,caso);
    });
    items.forEach((item: Item) => {
      caso == 1 ? item.ordine = item.ordineLidl : item.ordine = item.ordineAldi;
    });
    return items;
  }

  public static Sorter(a: Item, b: Item, caso: number) {
    let i;
    let j;
    //aldi
    if (caso == 2) {
      i = a.ordineAldi;
      j = b.ordineAldi;
    }
    //lidl
    else if (caso == 1) {
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
