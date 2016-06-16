import { Component, Injectable, OnInit } from '@angular/core';
import {FirebaseFactory} from "./firebase.factory";

@Injectable()
export class ImageService {

  getFirebaseRef(url) {
    return FirebaseFactory.getFirebaseRef(url);
  }

  getImage(imageKey, callback) {
    var imageRef = this.getFirebaseRef('images/' + imageKey);
    imageRef.once("value", function (data) {
      console.log("DEBUG IMG " + data.key);
      var imageFb = data.val();
      if (imageFb) {
        console.log("DEBUG IMG " + (imageFb.imageData ? imageFb.imageData.substring(0, 15) : imageFb.imageData));
        callback.call(this, {key: data.key, imageData: imageFb.imageData});
      }
    });
  }
}
