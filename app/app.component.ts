import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Component } from '@angular/core';

import {HeroesComponent} from "./heroes.component";
import {HeroService} from "./hero.service";
import {DashboardComponent} from "./dashboard.component";
import {HeroDetailComponent} from "./hero-detail.component";
import {RecipeDetailComponent} from "./recipe-detail.component";
import {ImageService} from "./image.service";
import {RecipeService} from "./recipe.service";


@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
    <nav>
      <a [routerLink]="['Dashboard']">Dashboard</a>
      <a [routerLink]="['Heroes']">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app/app.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    ImageService,
    RecipeService
  ]
})
@RouteConfig([
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  },
  {
    path: '/heroes',
    name: 'Heroes',
    component: HeroesComponent
  },
  {
    path: '/detail/:key',
    name: 'HeroDetail',
    component: HeroDetailComponent
  }
  ,
  {
    path: '/recipe/:key',
    name: 'RecipeDetail',
    component: RecipeDetailComponent
  }
])
export class AppComponent {
  title = "Tour of Heroes";
}
