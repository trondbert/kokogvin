import { Component, Input, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe";

@Component({
  selector: 'recipe-detail',
  templateUrl: 'app/recipe-detail.component.html',
  styleUrls: ['app/recipe-detail.component.css']
})
export class RecipeDetailComponent {

  @Input()
  private recipe:Recipe;

  constructor(private recipeService:RecipeService,
              private routeParams:RouteParams) {
  }

  ngOnInit() {
    let key = this.routeParams.get('key');
    var _this = this;
    this.recipeService.getRecipe(key,
      function (recipe) {
        _this.recipe = recipe;
      },
      function (img) {
        _this.recipe.image = {imageData: img.imageData};
      }
    );
  }

  save() {
    this.recipeService.saveRecipe(this.recipe);
  }

  goBack() {
    window.history.back();
  }


}
