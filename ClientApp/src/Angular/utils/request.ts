import { HttpClient } from "@angular/common/http";
import { Item, Utils } from "./utils";



export class Request {
  public static async GetItems(type: string, http: HttpClient): Promise<Item[]> {
    let response;

    let items: Item[];

    try {
      response = await http.post("Get" + type + "Items", null, Utils.option).toPromise();
    }
    catch (e) {
      console.log(e);
    }
    finally {
      if (response.status == 200) {
        items = JSON.parse(response.body);
      }
    }

    return items;
  }

  public static async StoreItem(type: string, http: HttpClient, item: Item): Promise<number> {
    let response;

    let res: number;
    try {
      response = await http.post("Store" + type + "Item", JSON.stringify(item), Utils.option).toPromise();
    }
    catch (e) {
      console.log(e);
    }
    finally {
      res = Number.parseInt(response.body);
    }

    return res;
  }


  public static async EditItem(type: string, http: HttpClient, item: Item): Promise<boolean> {
    let response;

    let res: boolean;
    try {
      response = await http.post("Edit" + type + "Item", JSON.stringify(item), Utils.option).toPromise();
    }
    catch (e) {
      console.log(e);
    }
    finally {
      res = JSON.parse(response.body);
    }

    return res;
  }

  public static async DeleteItem(type: string, http: HttpClient, item: Item): Promise<boolean> {
    let response;

    let res: boolean;
    try {
      response = await http.post("Delete" + type + "Item", JSON.stringify(item), Utils.option).toPromise();
    }
    catch (e) {
      console.log(e);
    }
    finally {
      res = JSON.parse(response.body);
    }

    return res;
  }
}
