import {AppComponent} from "./app.component";
export class Recipe {
    key:string;
    id:number;
    name:string;
    tags:string;
    portions:string;
    transients;
    image;
    imageId;
    dateCreated;
    dateModified;
    instructions;
    
    constructor() {
        this.name = null;
        this.transients = {ingredients1: "", ingredients2: ""};
        this.dateCreated = AppComponent.dateToString(new Date());
        this.dateModified = AppComponent.dateToString(new Date());
        this.imageId = null;
        this.instructions = null;
        this.portions = null;
        this.tags = null;
        this.id = null;
    }
}
