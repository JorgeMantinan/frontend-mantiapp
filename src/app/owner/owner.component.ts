import { Component, OnInit } from '@angular/core';
import { Owner } from './owner';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.sass']
})
export class OwnerComponent implements OnInit {

  owners: Owner[] = [
    { id: 1, name: 'David', lastname: 'Mantiñán', email: 'davidmanti92@gmail.com' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
