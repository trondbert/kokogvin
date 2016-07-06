import { provideRouter, RouterConfig } from '@angular/router';
import {RecipesComponent} from "./recipes.component";
import {RecipeEditComponent} from "./recipe-edit.component";
import {RecipeViewComponent} from "./recipe-view.component";
import {RecipeNewComponent} from "./recipe-new.component";
import {HomeComponent} from "./home.component";
import {RecipesByCategoryComponent} from "./recipes-by-category.component";

export const routes: RouterConfig = [
    {path : '',                         component : HomeComponent},
    {path : 'recipes',                  component : RecipesComponent},
    {path : 'middag',                   component : RecipesComponent}, //TODO
    {path : 'snacks',                   component : RecipesComponent}, //TODO
    {path : 'recipes/category/:cat',    component : RecipesByCategoryComponent}, //TODO
    {path : 'recipe/:key/edit',         component : RecipeEditComponent},
    {path : 'recipe/:key',              component : RecipeViewComponent},
    {path : 'recipes/new',              component : RecipeNewComponent},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
