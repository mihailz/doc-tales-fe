import {Injectable} from "@angular/core";
import {ImageModel} from "../model/image.model";

@Injectable()
export class ImagesService {
  private _images: ImageModel[] = [
    {
      description: 'Coding',
      url: 'assets/images/image_1.jpg'
    },
    {
      description: 'Coding',
      url: 'assets/images/image_2.jpg'
    },
    {
      description: 'Coding',
      url: 'assets/images/image_3.jpg'
    },
    {
      description: 'Documentation',
      url: 'assets/images/image_4.jpg'
    },
    {
      description: 'Documentation',
      url: 'assets/images/image_5.jpg'
    }
  ];

  getImages(): ImageModel[] {
    return this._images;
  }

}
