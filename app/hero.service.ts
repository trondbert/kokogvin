import { Component, Injectable, OnInit } from '@angular/core';

import {HEROES} from "./mock-heroes";
import {Hero} from "./hero";
import {ImageService} from "./image.service";
import {FirebaseFactory} from "./firebase.factory";

@Injectable()
export class HeroService {

    constructor(private imageService:ImageService) {
    }

    getFirebaseRef(url) {
        return FirebaseFactory.getFirebaseRef(url);
    }

    getHeroes(fn, fnImg) {
        var heroesRef = this.getFirebaseRef('heroes/').orderByChild("name");
        var _imageService = this.imageService;

        heroesRef.on('child_added', function (data) {
            console.log("DEBUG added " + data.key);
            var heroFb = data.val();
            if (heroFb) {
                console.log("DEBUG adding " + heroFb.name);
                fn.call(this, {key: data.key, id: heroFb.id, name: heroFb.name, imageData: heroFb.imageData});

                _imageService.getImage(data.key, fnImg);
            }
            else
                console.log("DEBUG hero undefined");
        });
    }

    getHero(key:string, fn, fnImg) {
        var heroRef = this.getFirebaseRef('heroes/' + key);
        var _imageService = this.imageService;

        heroRef.on('value', function (data) {
            console.log("DEBUG found " + data.key);
            var heroFb = data.val();
            if (heroFb) {
                console.log("DEBUG found " + heroFb.name);
                fn.call(this, {key: data.key, id: heroFb.id, name: heroFb.name, imageData: heroFb.imageData});

                _imageService.getImage(data.key, fnImg);
            }
            else
                console.log("DEBUG hero undefined");
        });
    }

    saveHero(hero:Hero) {
        var heroesRef = this.getFirebaseRef("heroes/");
        var updates = {};
        updates[hero.key] = hero;

        heroesRef.update(updates);
    }

}
