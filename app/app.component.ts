import {Component, OnInit, Type} from '@angular/core';

import {ImageService} from "./image.service";
import {RecipeService} from "./recipe.service";
import {ContextService} from "./context.service";
import {GenericComponent} from "./generic.component";
import {ROUTER_DIRECTIVES} from "@angular/router";

@Component({
    selector: 'app',
    template: `
        <div class="siteHeader"><h1>{{title}}</h1>
        <nav>
            <ul><li><a [routerLink]="['/recipes/category/middag']">Middag</a>
                    <ul><li><a [routerLink]="['/recipes/category/middag&fisk']">Fisk</a></li>
                        <li><a [routerLink]="['/recipes/category/middag&kjoett']">Kjøtt</a></li>
                        <li><a [routerLink]="['/recipes/category/middag&vegetar']">Vegetar</a></li>
                    </ul>
                </li>
                <li><a [routerLink]="['/recipes/category/snacks']">Snacks</a></li>
                <li><a [routerLink]="['/recipes/category/TODOvinEntitet']">Vin</a>
                    <ul><li><a [routerLink]="['/recipes/category/TODOvinEntitet']">Ny vin</a></li></ul>
                </li>
                <li class="createNew"><a href="#">&#x2295;</a>
                    <ul><li><a [routerLink]="['/recipes/new']">Ny&nbsp;oppskrift</a></li>
                        <li><a [routerLink]="['/recipes/category/TODOvinEntitet']">Ny vin</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        </div>
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

    private component:GenericComponent;

    constructor(private contextService:ContextService) {
        contextService.component$.subscribe( comp => {
            this.component = comp;
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
