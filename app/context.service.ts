import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";
import {GenericComponent} from "./generic.component";

@Injectable()
export class ContextService {

    private actionsSource           = new Subject<{[key:string]: string}>();
    private componentSource         = new Subject<GenericComponent>();

    private commandsSource         = new Subject<string>();

    actions$    = this.actionsSource.asObservable();
    component$  = this.componentSource.asObservable();
    commands$   = this.commandsSource.asObservable();

    setActions(actions) {
        this.actionsSource.next(actions);
    }

    setComponent(component:GenericComponent) {
        this.componentSource.next(component);
    }

    issueCommand(cmd) {
        this.commandsSource.next(cmd);
    }

}

