import { Component, OnInit } from '@angular/core';
import { Ownership } from './ownership';
import { OwnershipService } from './ownership.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent implements OnInit {

  // public because i need to get it in view by ngModel (if that not found, change the service to public to try)
  public ownership: Ownership = new Ownership();
  title: string = "Crear inmueble";

  // ActivatedRoute for obtain the parameters
  constructor( private ownershipService: OwnershipService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadOwnership();
  }

  loadOwnership(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.ownershipService.getOwnership(id).subscribe( (ownership) => this.ownership = ownership)
      }
    })
  }

  public createOwnership(): void{
    this.ownershipService.createOwnership(this.ownership).subscribe(
      response => this.router.navigate(['/ownership'])
    )

  }

}
