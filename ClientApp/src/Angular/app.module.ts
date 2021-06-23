import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LogCheck } from './utils/services';
import { DialogModule } from 'primeng/dialog';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { ListaAutocompleteComponent } from './listaAutocomplete/listaAutocomplete.component';
import { ListaBasicComponent } from './listaBase/listaBase.component';


import { ListaComponentComponent } from './listaComponent/listaComponent.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    ListaComponent,
    ListaAutocompleteComponent,
    ListaBasicComponent,
    ListaComponentComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AccordionModule,
    InputTextModule,
    SidebarModule,
    TableModule,
    ScrollingModule,
    ButtonModule,
    AutoCompleteModule,
    DropdownModule,
    BrowserAnimationsModule,
    DialogModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'lista', component: ListaComponent },
      { path: 'listaAutocomplete', component: ListaAutocompleteComponent },
      { path: 'listaBasic', component: ListaBasicComponent },
    ])
  ],
  providers: [LogCheck],
  bootstrap: [AppComponent]
})
export class AppModule { }
