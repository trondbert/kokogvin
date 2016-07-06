import {RecipesComponent} from "./recipes.component";

export class RecipesByCategoryComponent extends RecipesComponent {

    ngOnInit() {
        var _recipes = this.recipes;
        var _recipesMap = this.recipesMap;

        this.recipeService.getRecipesByCategory("kjoett&fisk", function(recipe) {
            _recipes.push(recipe);
            _recipesMap[recipe.key] = recipe;
        });
    }

}