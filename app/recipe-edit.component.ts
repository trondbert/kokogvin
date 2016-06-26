import { Component, Input, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe";
declare var $:any;

@Component({
    selector: 'recipe',
    templateUrl: 'app/recipe-edit.component.html',
    styleUrls: ['app/recipe-edit.component.css']
})
export class RecipeEditComponent {

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
            }
        );
    }

    save() {
        this.recipeService.saveRecipe(this.recipe);
    }

    static goBack() {
        window.history.back();
    }

    chooseImg() {
        //noinspection TypeScriptUnresolvedFunction
        $("#imageChooser").trigger("click");
    }

    imgChosen(event) {
        var thiz = this;

        var reader = new FileReader();
        reader.onloadend = function (e:ProgressEvent) {
            //noinspection TypeScriptUnresolvedVariable
            thiz.recipe.image = {"imageData": e.target.result};
        };
        reader.readAsDataURL(event.target.files[0]);
    }

}
