import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData, Utils } from '../utils/utils';
import { LogCheck } from '../utils/services';
import { Storage } from '../utils/Storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {


  passErr: boolean = false;
  nomeErr: boolean = false;

  loginData: LoginData = new LoginData();

  errorBool: boolean = false;

  waiting: boolean = false;

  constructor(private http: HttpClient, private router: Router, private logCheck: LogCheck, private storage: Storage) {
  }

  async login() {

    if (this.checkForm()) {
      this.waiting = true;

      let response;

      try {
        response = await this.http.post("Login", JSON.stringify(this.loginData), Utils.option).toPromise();
        this.errorBool = false;

        await this.storage.GetItems(this.http);

        if (response.status == 200) {
          this.logCheck.logged = true;
          this.router.navigate(['/lista']);
        }
      }
      catch (e) {
        console.log(e);
      }
      this.waiting = false;
    }
  }

  checkForm() {
    let res: boolean = false;

    this.passErr = false;
    this.nomeErr = false;

    this.loginData.email == "" || this.loginData == null ? this.nomeErr = true :
      this.loginData.password == "" || this.loginData.password == null ? this.passErr = true : res = true;

    return res;
  }
}
