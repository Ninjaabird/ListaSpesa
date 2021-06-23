import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item, Utils } from '../utils/utils';


@Component({
  selector: 'app-listaBasic-component',
  templateUrl: './listaBase.component.html'
})

export class ListaBasicComponent {
  page: string;

  constructor() {
    this.page = 'Basic';
  }
}
