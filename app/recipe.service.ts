import { Component, Injectable, OnInit } from '@angular/core';

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

    getRecipes(fn) {
        var recipesRef = this.getFirebaseRef('recipes/').orderByChild("name");
        var _imageService = this.imageService;
        var _recipeFromStorage = RecipeService.recipeFromStorage;

        recipesRef.on('child_added', function (data) {

            var recipeFb = data.val();
            if (recipeFb) {
                var recipe = _recipeFromStorage(data.key, recipeFb);
                fn.call(this, recipe);

                var imgCallback = function (img) {
                    recipe.image = img;
                };
                _imageService.getImage(recipe.imageId, imgCallback);
            }
            else
                console.log("DEBUG hero undefined");
        });
    }

    getRecipe(key:string, fn) {
        var recipeRef = this.getFirebaseRef('recipes/' + key);
        var _imageService = this.imageService;
        var _recipeFromStorage = RecipeService.recipeFromStorage;

        recipeRef.on('value', function (data) {
            var recipeFb = data.val();
            if (recipeFb) {
                var recipe = _recipeFromStorage(data.key, recipeFb);
                fn.call(this, recipe);

                var imgCallback = function (img) {
                    recipe.image = img;
                };
                _imageService.getImage(recipeFb.imageId, imgCallback);
            }
            else
                console.log("DEBUG hero undefined");
        });
    }

    static recipeFromStorage(key, recipeFb) {
        var recipe:Recipe = new Recipe();
        recipe.dateCreated = recipeFb.dateCreated;
        recipe.dateModified = recipeFb.dateModified;
        recipe.imageId = recipeFb.imageId;
        recipe.instructions = recipeFb.instructions;
        recipe.key = key;
        recipe.name = recipeFb.name;
        recipe.portions = recipeFb.portions;
        recipe.tags = recipeFb.tags;
        recipe.transients = {
            ingredients1: recipeFb.ingredients.split("~*/|")[0] || "",
            ingredients2: recipeFb.ingredients.split("~*/|")[1] || "" };
        return recipe;
    };

    static recipeForStorage(recipe) {
        return {
            dateCreated: recipe.dateCreated,
            dateModified: recipe.dateModified,
            imageId: recipe.imageId,
            ingredients: recipe.transients.ingredients1 + "~*/|" + recipe.transients.ingredients2,
            instructions: recipe.instructions,
            name: recipe.name,
            portions: recipe.portions,
            tags: recipe.tags,
        };
    }

    saveRecipe(recipe:Recipe, callback) {
        var thiz = this;
        if (recipe.image) {
            var callbackImg = function(imageKey) {
                recipe.imageId = imageKey;
                thiz.saveRecipeOnly(recipe);
            };
            this.imageService.saveImage(recipe.image, recipe.imageId, callbackImg);
        }
        else {
            var key = this.saveRecipeOnly(recipe);
            callback.call(this,key);
        }
    }

    saveRecipeOnly(recipe:Recipe) {
        if (recipe.key) {
            var recipesRef = this.getFirebaseRef("recipes/");
            console.log(recipe.tags);

            //noinspection TypeScriptUnresolvedFunction
            recipesRef.child(recipe.key).set(RecipeService.recipeForStorage(recipe));
        }
        else {
            var recipesRef = this.getFirebaseRef("recipes/");
            var recipeRef = recipesRef.push(RecipeService.recipeForStorage(recipe));
            return recipeRef.key;
        }
    }

    deleteRecipe(recipe:Recipe) {
        var recipesRef = this.getFirebaseRef("recipes/");
        recipesRef.child(recipe.key).remove();
    }

}
