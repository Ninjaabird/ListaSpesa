import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item, Utils } from '../utils/utils';


@Component({
  selector: 'app-listaAutocomplete-component',
  templateUrl: './listaAutocomplete.component.html'
})

export class ListaAutocompleteComponent {
  page: string;

  constructor() {
    this.page = 'Autocomplete';
  }
}
