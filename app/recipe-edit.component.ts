import { Component, Input, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe";
import {RecipeComponent} from "./recipe.component";
import {ContextService} from "./context.service";
import {ImageService} from "./image.service";
import {Location} from "@angular/common";
declare var $:any;

@Component({
    selector: 'recipeEdit',
    templateUrl: 'app/recipe-edit.component.html',
    styleUrls: ['app/app.component.css', 'app/recipe-edit.component.css']
})
export class RecipeEditComponent extends RecipeComponent {

    private recipe:Recipe;

    placeholderImage = ImageService.placeholderImage;

    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private contextService:ContextService,
                private location:Location,
                recipeService:RecipeService) {
        super("edit", recipeService);
    }

    ngOnInit() {
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            this.getRecipeService().getRecipe(key,
                function (recipe) {
                    thisComp.recipe = recipe;
                }
            );
        });

        this.getTagMap("kjøtt middag");
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    save() {
        var thisComp = this;
        this.getRecipeService().saveRecipe(this.recipe, function(key) {
            thisComp.goToRecipe(thisComp.recipe, null);
        });
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

    getContextService():ContextService {
        return this.contextService;
    }

    getRouter():Router {
        return this.router;
    }
    
    getLocation():Location {
        return this.location;
    }
    getRecipe() {
        return this.recipe;    
    }

    getTagMap(tags) {
        for (let tag of tags.split(/ +/)) {
            var tagFixed = tag.replace(/ø/g, "oe").replace(/å/g, "aa").replace(/æ/g, "ae");
            console.log(tagFixed);
        }
    }
}
