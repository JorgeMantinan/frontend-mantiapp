import { Component, OnInit } from '@angular/core';
import { Ownership } from './ownership';
import { OwnershipService } from './ownership.service';

@Component({
  selector: 'app-ownership',
  templateUrl: './ownership.component.html',
  styleUrls: ['./ownership.component.sass']
})
export class OwnershipComponent implements OnInit {
  //public ownership: Ownership = new Ownership();
  ownerships: Ownership[] = [];

  constructor( private ownershipService: OwnershipService) { }

  ngOnInit(): void {

    //subscribe for make it Observable
    this.ownershipService.getOwnerships().subscribe(
      ownerships => this.ownerships = ownerships
    );

  }

}
