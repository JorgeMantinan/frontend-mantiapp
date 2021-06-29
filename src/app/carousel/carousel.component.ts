import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  tipoDeVenta = [
    {string: "Compra"},{string: "Alquiler"},{string: "Ventanas"}
  ];

  slides = [
    {image: "../assets/img/casa-coruna.jpg"}, 
    {image: "../assets/img/casa-moderna2.jpg"},
    {image: "../assets/img/casa-sencilla.jpg"}
  ];

}
