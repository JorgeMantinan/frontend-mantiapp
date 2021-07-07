import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { Owner } from './owner';
import { OwnerService } from './owner.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.sass']
})
export class OwnerComponent implements OnInit {

  owners: Owner[];

  constructor( private ownerService: OwnerService) { }

  ngOnInit(): void {

    //sunscribe for make it Observable
    this.ownerService.getOwners().subscribe(
      owners => this.owners = owners
    );

  }

}
