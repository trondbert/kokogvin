import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import {Recipe} from "./recipe";
import {RecipeService} from "./recipe.service";
import {Router} from "@angular/router";
import {GenericComponent} from "./generic.component";
import {ContextService} from "./context.service";
import {Location} from "@angular/common";

@Component({
    selector: 'recipes',
    templateUrl: 'app/recipes.component.html',
    styleUrls: ['app/app.component.css', 'app/recipes.component.css'],
})
export class RecipesComponent extends GenericComponent implements OnInit {

    recipesMap:{[key:string]:Recipe;} = {};

    recipes:Recipe[] = [];

    constructor(private router:Router,
                private location:Location,
                private contextService: ContextService,
                protected recipeService:RecipeService) {
        super();
    }

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

    newRecipe(event) {
        let link = ['RecipeNew'];
        this.router.navigate(link);

        event.preventDefault();
    }

    getContextService() {
        return this.contextService;
    }
    getLocation() {
        return this.location;
    }
    getRouter() {
        return this.router;
    }
}

