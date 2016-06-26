import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Component } from '@angular/core';

import {ImageService} from "./image.service";
import {RecipeService} from "./recipe.service";
import {RecipesComponent} from "./recipes.component";
import {RecipeEditComponent} from "./recipe-edit.component";


@Component({
    selector: 'app',
    template: `
        <h1 class="siteHeader">{{title}}</h1>
        <nav>
            <a [routerLink]="['Recipes']">{{recipesLinkText}}</a>
            <!--<a [routerLink]="['Beverages']">{{beveragesLinkText}}</a>-->
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        ImageService,
        RecipeService
    ]
})
@RouteConfig([
    {
        path: '/recipe/:key/edit',
        name: 'RecipeEdit',
        component: RecipeEditComponent
    },
    {
        path: '/recipes/',
        name: 'Recipes',
        component: RecipesComponent
    }
])
export class AppComponent {
    title = "Kokogvin";
    recipesLinkText = "Oppskrifter";
    beveragesLinkText = "Vin";
}
