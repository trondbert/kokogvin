import {GenericComponent} from "./generic.component";
import {RecipeService} from "./recipe.service";
import {Recipe} from "./recipe";

export abstract class RecipeComponent extends GenericComponent {

    private recipeService:RecipeService;

    constructor(private mode:string,
                recipeService:RecipeService) {
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

    abstract getRecipe();

    editRecipe() {
        let link = ['/recipe/' + this.getRecipe().key + '/edit/'];
        this.getRouter().navigate(link);
    }

    deleteRecipe() {
        if (this.getRecipe()) {
            confirm("Vil du virkelig slette oppskriften?");
            this.recipeService.deleteRecipe(this.getRecipe());
            let link = ['/recipes'];
            this.getRouter().navigate(link);
        }
    }
}
