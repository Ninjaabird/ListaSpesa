import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Utils } from "./utils";
import { interval } from "rxjs";


@Injectable()
export class LogCheck {

  logged: boolean = false;

  constructor(private http: HttpClient) {
    this.logCheck();

    interval(5000).subscribe(val => this.logCheck());  
  }
  async logCheck() {
    let response;
    try {
      response = await this.http.post("Access", null, Utils.option).toPromise();
    }
    catch (e) {
      console.log(e);
    }
    finally {
      if (response.status == 200) {
        this.logged = true;
      }
      else {
        this.logged = false;
      }
    }
  }
}
