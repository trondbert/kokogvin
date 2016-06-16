import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {HeroService} from "./hero.service";
import {Hero} from "./hero";
import {HeroDetailComponent} from "./hero-detail.component";

@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes:Hero[] = [];

  heroesMap:{[key:string]:Hero;} = {};

  constructor(private heroService:HeroService, private router:Router) {
  }

  ngOnInit() {
    console.log("DEBUG INIT Dashboard");
    var _heroes = this.heroes;
    var _heroesMap = this.heroesMap;

    this.heroService.getHeroes(
      function (hero) {
        _heroes.push(hero);
        _heroesMap[hero.key] = hero;
      },
      function (img) {
        _heroesMap[img.key].imageData = img.image;
      }
    );
  }

  gotoDetail(hero:Hero) {
    let link = ['HeroDetail', {key: hero.key}];
    this.router.navigate(link);
  }
}
