import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from "./hero";
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from "./hero.service";

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls: ['app/heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';

  selectedHero:Hero;

  heroesMap:{[key:string]:Hero;} = {};

  heroes:Hero[] = [];

  constructor(private router:Router,
              private heroService:HeroService) {
  }

  ngOnInit() {
    var _heroes = this.heroes;
    var _heroesMap = this.heroesMap;
    this.heroService.getHeroes(
      function (hero) {
        _heroes.push(hero);
        _heroesMap[hero.key] = hero;
      },
      function (img) {
        _heroesMap[img.key].imageData = img.imageData;
      }
    );
  }

  onSelect(hero:Hero) {
    this.selectedHero = hero;
  }


  gotoDetail(hero:Hero) {
    let link = ['HeroDetail', {key: hero.key}];
    this.router.navigate(link);
  }
}

