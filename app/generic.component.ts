import {ContextService} from "./context.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Recipe} from "./recipe";

export abstract class GenericComponent {

    ngOnInit() {
        this.getContextService().setComponent(this);
    }

    abstract getRouter() : Router;
    abstract getContextService() : ContextService;
    abstract getLocation(): Location;

    deleteRecipe() {
        throw "Not implemented";
    }

    issueCommand(cmd) {
        this.getContextService().issueCommand(cmd);
    }

    goBack() {
        this.getLocation().back();
    }

    goToRecipes() {
        let link = ['/recipes'];
        this.getRouter().navigate(link);
    }

    goToRecipe(recipe:Recipe, event) {
        let link = ['/recipe/' + recipe.key];
        this.getRouter().navigate(link);

        event && event.preventDefault();
    }

    withLineBreaks(val:string) {
        if (!val) return "";

        return val.replace(/\n/g, '<br/>');
    }
}