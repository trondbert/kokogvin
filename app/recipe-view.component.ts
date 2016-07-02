import { Component, OnInit } from '@angular/core';

import {RecipeService} from "./recipe.service";
import {ContextService} from "./context.service";
import {RecipeComponent} from "./recipe.component";
import {Recipe} from "./recipe";
import {ImageService} from "./image.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
declare var $:any;

@Component({
    selector: 'recipeView',
    templateUrl: 'app/recipe-view.component.html',
    styleUrls: ['app/app.component.css', 'app/recipe-view.component.css']
})
export class RecipeViewComponent extends RecipeComponent implements OnInit {

    private recipe:Recipe;

    placeholderImage = ImageService.placeholderImage;
    private sub:any;

    constructor(private router:Router,
                private route:ActivatedRoute,
                private contextService:ContextService,
                private location:Location,
                recipeService:RecipeService) {

        super("view", recipeService);
        contextService.commands$.subscribe( cmd => {
            console.log("Command received: " + cmd);
            if ("deleteRecipe" == cmd)
            this.deleteRecipe();
        });
    }

    ngOnInit() {
        super.ngOnInit();
        var thisComp = this;
        this.sub = this.route.params.subscribe(params => {
            let key = params['key'];
            thisComp.getRecipeService().getRecipe(key,
                function (recipe) {
                    thisComp.recipe = recipe;
                }
            );
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getRouter():Router {
        return this.router;
    }
    getContextService():ContextService {
        return this.contextService;
    }
    getLocation():Location {
        return this.location;
    }
    getRecipe() {
        return this.recipe;
    }
}
