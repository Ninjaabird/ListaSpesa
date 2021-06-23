import { Component, Input, OnInit } from '@angular/core';
import { LogCheck } from '../utils/services';
import { interval } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  isExpanded = false;

  logged: boolean = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(logCheck: LogCheck) {
    interval(500).subscribe(val => this.logged = logCheck.logged)
  }

  ngOnInit() {
  }
}
