import { Component, Input, OnInit } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import {Hero} from "./hero";
import {HeroService} from "./hero.service";

@Component({
    selector: 'my-hero-detail',
    templateUrl: 'app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent {

    @Input()
    private hero:Hero;

    constructor(private heroService:HeroService,
                            private routeParams:RouteParams) {
    }

    ngOnInit() {
        let key = this.routeParams.get('key');
        var _this = this;
        this.heroService.getHero(key,
            function (hero) {
                _this.hero = hero;
            },
            function (img) {
                _this.hero.imageData = img.image;
            }
        );
    }

    save() {
        this.heroService.saveHero(this.hero);
    }

    goBack() {
        window.history.back();
    }
}
