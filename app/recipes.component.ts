import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {Recipe} from "./recipe";
import {RecipeService} from "./recipe.service";

@Component({
    selector: 'recipes',
    templateUrl: 'app/recipes.component.html',
    styleUrls: ['app/recipes.component.css'],
})
export class RecipesComponent implements OnInit {

    recipesMap:{[key:string]:Recipe;} = {};

    recipes:Recipe[] = [];

    constructor(private router:Router, private recipeService:RecipeService) { }

    ngOnInit() {
        window['_recipes'] = this.recipes;
        var _recipes = this.recipes;
        var _recipesMap = this.recipesMap;
        this.recipeService.getRecipes(
            function (recipe) {
                _recipes.push(recipe);
                _recipesMap[recipe.key] = recipe;
            }
        );
    }

    editRecipe(recipe:Recipe, event) {
        let link = ['RecipeEdit', {key: recipe.key}];
        this.router.navigate(link);

        event.preventDefault();
    }
}

