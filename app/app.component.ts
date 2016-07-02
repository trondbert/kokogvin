import {Component, OnInit, Type} from '@angular/core';

import {ImageService} from "./image.service";
import {RecipeService} from "./recipe.service";
import {ContextService} from "./context.service";
import {GenericComponent} from "./generic.component";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'app',
    template: `
        <h1 class="siteHeader">{{title}}</h1>
        <nav>
            <a [routerLink]="['/recipes']">{{recipesLinkText}}</a>
            <!--<a [routerLink]="['Beverages']">{{beveragesLinkText}}</a>-->
            <!--<a *ngIf="actions && actions['delete']" (click)="component.issueCommand('deleteRecipe')" href="">{{ actions['delete'] }}</a>-->
            <!--<a (click)="component.deleteRecipe(router)" href="">test</a>-->
        </nav>
        <router-outlet></router-outlet>
    `,
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ImageService,
        RecipeService,
        ContextService
    ]
})
export class AppComponent implements OnInit {

    title = "Mat, drikke og kos";
    recipesLinkText = "Oppskrifter";
    beveragesLinkText = "Vin";

    private actions: {[key:string]: string};
    private component:GenericComponent;

    constructor(private contextService:ContextService) {
        contextService.actions$.subscribe( actions => {
            this.actions = actions;
        });
        contextService.component$.subscribe( comp => {
            this.component = comp;
            console.log(comp);
        });
    }

    static dateToString(date) {
        if (date == null) return null;

        return "" + (date.getYear() + 1900) +
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2);
    };

    ngOnInit():any {
        return undefined;
    }
}
