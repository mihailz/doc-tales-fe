import { Component, OnInit } from '@angular/core';
import {ImageModel} from "../../model/image.model";
import {ImagesService} from "../../service/images.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})
export class LayoutComponent implements OnInit {
  images: ImageModel[] = [];
  actualImage!: ImageModel;
  changeBackgroundCounter = 0;
  constructor(private _imagesService: ImagesService) { }

  ngOnInit(): void {
    this.images = this._imagesService.getImages();
    this.actualImage = this.images[0];
    setInterval(() => {
      this.changeBackgroundCounter++;
      if (this.changeBackgroundCounter > this.images.length - 1) {
        this.changeBackgroundCounter = 0;
      }
      this.actualImage = this.images[this.changeBackgroundCounter];
    }, 1000000);
  }

}
