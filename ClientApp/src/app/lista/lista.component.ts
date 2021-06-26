import { Component } from '@angular/core';
import { Page } from '../utils/utils';


@Component({
  selector: 'app-lista-component',
  templateUrl: './lista.component.html'
})

export class ListaComponent {
  page: Page;

  constructor() {
    this.page = Page.Lista;
  }

}




