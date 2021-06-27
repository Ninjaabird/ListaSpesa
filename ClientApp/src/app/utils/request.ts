import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item, Utils } from "./utils";



export class Request {
  public static async GetItems(type: string, http: HttpClient): Promise<Item[]> {
    let response;

    try {
      response = await http.post("Get" + type + "Items", null, Utils.option).toPromise();
      if (response.status == 200) return JSON.parse(response.body);
      else return [];
    }
    catch (e) {
      console.log(e);
    }
  }

  public static async StoreItem(type: string, http: HttpClient, item: Item): Promise<number> {
    let response;

    let res: number;
    try {
      response = await http.post("Store" + type + "Item", JSON.stringify(item), Utils.option).toPromise();
      if (response.status == 200) {
        res = Number.parseInt(response.body);
      }
      else return 0;
    }
    catch (e) {
      console.log(e);
    }
    return res;
  }

  public static async EditItem(type: string, http: HttpClient, item: Item): Promise<boolean> {
    let response;

    let res: boolean;
    try {
      response = await http.post("Edit" + type + "Item", JSON.stringify(item), Utils.option).toPromise();
      if (response.status == 200) {
        res = JSON.parse(response.body);
      }
      else return false;
    }
    catch (e) {
      console.log(e);
    }
    finally {
     
    }

    return res;
  }

  public static async DeleteItem(type: string, http: HttpClient,listId: number[]): Promise<boolean[]> {
    let response;

    let res: boolean[];
    try {
      response = await http.post("Delete" + type + "Item", JSON.stringify(listId), Utils.option).toPromise();
      if (response.status == 200) {
        res = JSON.parse(response.body);
      }
      else return [false];
    }
    catch (e) {
      console.log(e);
    }

    return res;
  }

  public static async ImportBaseList(http: HttpClient): Promise<boolean> {
    let response;

    try {
      response = await http.post("BasicListToItemList", "", Utils.option).toPromise();
      if (response.status == 200) return JSON.parse(response.body);
      else return false;
    }
    catch (e) {
      console.log(e);
    }
  }

  public static async GetAutocompleteItems(http: HttpClient, nome: string): Promise<Item[]> {
    let response;
    try {
      response = await http.get("GetAutocomplete?nome=" + nome, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'text',
        observe: 'response'
      }).toPromise();
    } catch (e) { console.log(e); }
    return JSON.parse(response.body);
  }
}
