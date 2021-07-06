import { Component, OnInit } from '@angular/core';
import { Owner } from './owner';
import { OWNERS } from './owner.json';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.sass']
})
export class OwnerComponent implements OnInit {

  owners: Owner[];

  constructor() { }

  ngOnInit(): void {

    this.owners = OWNERS;

  }

}
