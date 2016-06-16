import { Component, Injectable, OnInit } from '@angular/core';

import {HEROES} from "./mock-heroes";
import {Recipe} from "./recipe";
import {ImageService} from "./image.service";
import {FirebaseFactory} from "./firebase.factory";

@Injectable()
export class RecipeService {

  constructor(private imageService:ImageService) {
  }

  getFirebaseRef(url) {
    return FirebaseFactory.getFirebaseRef(url);
  }

  getRecipes(fn, fnImg) {
    var recipesRef = this.getFirebaseRef('recipes/').orderByChild("name");
    var _imageService = this.imageService;

    recipesRef.on('child_added', function (data) {
      console.log("DEBUG added " + data.key);
      var recipeFb = data.val();
      if (recipeFb) {
        console.log("DEBUG adding " + recipeFb.name);
        fn.call(this, {key: data.key, id: recipeFb.id, name: recipeFb.name});

        _imageService.getImage(data.key, fnImg);
      }
      else
        console.log("DEBUG hero undefined");
    });
  }

  getRecipe(key:string, fn, fnImg) {
    var recipeRef = this.getFirebaseRef('recipes/' + key);
    var _imageService = this.imageService;

    recipeRef.on('value', function (data) {
      console.log("DEBUG found " + data.key);
      var recipeFb = data.val();
      if (recipeFb) {
        console.log("DEBUG found " + recipeFb.name);
        var recipe:Recipe = new Recipe();
        recipe.key = data.key;
        recipe.id = recipeFb.id;
        recipe.name = recipeFb.name;
        recipe.transients = {ingredients1: recipeFb.ingredients, ingredients2: ""};
        recipe.tags = recipeFb.tags;
        recipe.portions = recipeFb.portions;
        fn.call(this, recipe);

        _imageService.getImage(recipeFb.imageId, fnImg);
      }
      else
        console.log("DEBUG hero undefined");
    });
  }

  saveRecipe(recipe:Recipe) {
    var heroesRef = this.getFirebaseRef("recipes/");
    var updates = {};
    updates[recipe.key] = recipe;

    heroesRef.update(updates);
  }

}
