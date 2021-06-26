import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item, Page, Utils } from '../utils/utils';


@Component({
  selector: 'app-listaBasic-component',
  templateUrl: './listaBase.component.html'
})

export class ListaBasicComponent {
  page: Page;

  constructor() {
    this.page = Page.ListaBase;
  }
}
