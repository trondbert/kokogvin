import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Rx";
import {GenericComponent} from "./generic.component";

@Injectable()
export class ContextService {

    private componentSource         = new Subject<GenericComponent>();

    private commandsSource         = new Subject<string>();

    component$  = this.componentSource.asObservable();
    commands$   = this.commandsSource.asObservable();

    setComponent(component:GenericComponent) {
        this.componentSource.next(component);
    }

    issueCommand(cmd) {
        this.commandsSource.next(cmd);
    }

}

