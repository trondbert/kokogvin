import { provideRouter, RouterConfig } from '@angular/router';
import {RecipesComponent} from "./recipes.component";
import {RecipeEditComponent} from "./recipe-edit.component";
import {RecipeViewComponent} from "./recipe-view.component";
import {RecipeNewComponent} from "./recipe-new.component";
import {HomeComponent} from "./home.component";

export const routes: RouterConfig = [
    {path : '',                  component : HomeComponent},
    {path : 'recipes',           component : RecipesComponent},
    {path : 'recipe/:key/edit',  component : RecipeEditComponent},
    {path : 'recipe/:key',       component : RecipeViewComponent},
    {path : 'recipe/new',        component : RecipeNewComponent},
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes)
];
