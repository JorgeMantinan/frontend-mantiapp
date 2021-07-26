import { Component, OnInit } from '@angular/core';
import { ModalService } from './detail/modal.service';
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
  selectedOwnership: Ownership;

  constructor(private modalService: ModalService, private ownershipService: OwnershipService) { }

  ngOnInit(): void {

    //subscribe for make it Observable
    this.ownershipService.getOwnerships().subscribe(
      ownerships => this.ownerships = ownerships
    );

    this.modalService.notifyUpload.subscribe(ownership => {
      //To check each ownership with map()
      this.ownerships = this.ownerships.map(originalOwnership => {
        if(ownership.id == originalOwnership.id){
          originalOwnership.photo = ownership.photo;
        }
        return originalOwnership;
      })
    });

  }

  deleteOwnership(ownership: Ownership): void{
    this.ownershipService.deleteOwnership(ownership.id).subscribe(
      response => {
        //Filter is used to get only the elements that we want and return in a new array
        //that remove of the list at the ownership deleted
        this.ownerships = this.ownerships.filter(ownship => ownship !== ownership)
      }
    )
  }

  openModal(ownership: Ownership){
    this.selectedOwnership = ownership;
    this.modalService.openModal();
  }

}
