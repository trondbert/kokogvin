import {Component, OnInit} from '@angular/core';

import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe";
import {ImageService} from "./image.service";
import {Router} from "@angular/router";
declare var $:any;

@Component({
    selector: 'recipeNew',
    templateUrl: 'app/recipe-edit.component.html',
    styleUrls: ['app/app.component.css', 'app/recipe-edit.component.css']
})
export class RecipeNewComponent implements OnInit {

    private recipe:Recipe;

    placeholderImage = ImageService.placeholderImage;

    constructor(private router:Router,
                private recipeService:RecipeService) {

    }

    ngOnInit() {
        this.recipe = new Recipe();
    }

    save() {
        var thiz = this;
        var callback = function(recipeKey) {
            let link = ['RecipeEdit', {key: recipeKey}];
            thiz.router.navigate(link);
        };
        this.recipeService.saveRecipe(this.recipe, callback);
    }
    
    backToRecipes() {
        let link=['Recipes'];
        this.router.navigate(link);
    }

    chooseImg() {
        //noinspection TypeScriptUnresolvedFunction
        $("#imageChooser").trigger("click");
    }

    imgChosen(event) {
        var thiz = this;

        var reader = new FileReader();
        reader.onloadend = function (e:ProgressEvent) {
            var hasResult:FileReader = <FileReader>(e.target);
            //noinspection TypeScriptUnresolvedVariable
            thiz.recipe.image = {"imageData": hasResult.result};
        };
        reader.readAsDataURL(event.target.files[0]);
    }
}
