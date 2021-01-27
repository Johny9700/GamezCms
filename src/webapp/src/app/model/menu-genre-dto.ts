import { ImmutableObject } from "@angular/cdk/overlay/typings/overlay-ref";
import { KeyValue } from "@angular/common";
import { MenuArticleDTO } from "./menu-article-dto";

export class MenuGenreDTO {
    constructor(
        public id: number,
        public name: string,
        public articlesList: Array<MenuArticleDTO>) {}
}
