import { Component } from '@angular/core';


@Component({
  selector: 'app-lista-component',
  templateUrl: './lista.component.html'
})

export class ListaComponent {
  page: string;

  constructor() {
    this.page = '';
  }

}




