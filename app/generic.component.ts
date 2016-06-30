import {ContextService} from "./context.service";
import {Router} from "@angular/router-deprecated";

export abstract class GenericComponent {

    ngOnInit() {
        this.getContextService().setComponent(this);
    }

    abstract getRouter() : Router;
    
    abstract getContextService() : ContextService;

    deleteRecipe() {
        throw "Not implemented";
    }

    issueCommand(cmd) {
        this.getContextService().issueCommand(cmd);
    }
}