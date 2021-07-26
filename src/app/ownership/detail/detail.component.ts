import { Component, Input, OnInit } from '@angular/core';
import { Ownership } from '../ownership';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { OwnershipService } from '../ownership.service';
import { ModalService } from './modal.service';

@Component({
  selector: 'ownership-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  @Input() ownership: Ownership = new Ownership();
  title: string = "Detalle del inmueble";
  private selectedPhoto!: File;
  public progress: number = 0;

  constructor(private ownershipService: OwnershipService ,public modalService: ModalService) { }

  ngOnInit(): void { }

  selectPhoto(event: any){
    // With the 0, we are select the only photo that we are upload (files is an array)
    this.selectedPhoto = event.target.files[0];
    this.progress = 0;
  }

  uploadPhoto(){
    this.ownershipService.uploadPhoto(this.selectedPhoto, this.ownership.id).subscribe(
      event => {
        //Calculate the progress bar
        if(event.type === HttpEventType.UploadProgress && event.total){
          const total: number = event.total;  
          this.progress = Math.round((event.loaded/total)*100);
        } else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.ownership = response.ownership as Ownership;
          
          //For update the photo on the list
          this.modalService.notifyUpload.emit(this.ownership);
          Swal.fire('La foto se ha subido', `La foto se ha subido con éxito: ${this.ownership.photo}`, 'success');
        }
      }
    )
  }

  closeModal(){
    this.modalService.closeModal();
    //TODO Don't found the solution to File null or set to undefined because in the uploadPhoto the same variable have the same problem to put File | null
    //On tsconfig not found "strictNullChecks": true,
    //this.selectedPhoto = null;
    this.progress = 0;
  }

}
