import {GenericComponent} from "./generic.component";
import {RecipeService} from "./recipe.service";

export abstract class RecipeComponent extends GenericComponent {

    private recipeService:RecipeService;

    constructor(recipeService:RecipeService) {
        super();
        this.recipeService = recipeService;
    }
    
    ngOnInit() {
        super.ngOnInit();
        this.getContextService().setActions({"delete": "Slett oppskriften"});
    }
    
    getRecipeService() {
        return this.recipeService;
    }
}
