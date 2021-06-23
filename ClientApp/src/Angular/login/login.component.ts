import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData, Utils } from '../utils/utils';
import { LogCheck } from '../utils/services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {


  passErr: boolean = false;
  nomeErr: boolean = false;

  loginData: LoginData = new LoginData();

  error: string = "";

  errorBool: boolean = false;

  constructor(private http: HttpClient, private router: Router, private logCheck: LogCheck) {
  }

  async login() {

    if (this.checkForm()) {

      let response;

      try {
        response = await this.http.post("Login", JSON.stringify(this.loginData), Utils.option).toPromise();
        this.errorBool = false;
      }
      catch (e) {
        console.log(e);
      }
      finally {

        if (response.status == 200) {
          this.logCheck.logged = true;
          this.router.navigate(['/lista']);
        }
        else if (response.status == 201) {
          this.errorBool = true;
          this.error = "Utente già connesso";
        }
        else if (response.status == 202) {
          this.errorBool = true;
          this.error = "Password o nome errato";
        }
        else if (response.status == 203) {
          this.errorBool = true;
          this.error = "Errore interno al server";
        }
        else {
          console.log(response);
        }
      }

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
