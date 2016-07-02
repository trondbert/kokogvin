import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import {enableProdMode} from "@angular/core";
import {APP_ROUTER_PROVIDERS} from "./app.routes";

enableProdMode();

bootstrap(AppComponent, [APP_ROUTER_PROVIDERS])
    .catch(err => console.error(err));
