import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ownership } from '../ownership';
import { OwnershipService } from '../ownership.service';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'ownership-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  public ownership: Ownership = new Ownership();
  title: string = "Detalle del inmueble";
  private selectedPhoto: File;

  constructor(private ownershipService: OwnershipService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let id: any = params.get('id');
        if(id){
          this.ownershipService.getOwnership(id).subscribe(ownership => {
            this.ownership = ownership;
          })
        }
      }
    )
  }

  selectPhoto(event: any){
    // With the 0, we are select the only photo that we are upload (files is an array)
    this.selectedPhoto = event.target.files[0];
  }

  uploadPhoto(){
    this.ownershipService.uploadPhoto(this.selectedPhoto, this.ownership.id).subscribe(
      ownership => {
        this.ownership = ownership;
        Swal.fire('La foto se ha subido', `La foto se ha subido con éxito: ${this.ownership.photo}`, 'success');
      }
    )
  }

}
