import { GenreDTO } from "./genre-dto";
import { UserDTO } from "./user-dto";

export class ArticleDTO {
    constructor(
        public id: number,
        public title: string,
        public content: string,
        public user: UserDTO,
        public genre: GenreDTO,
        public publicationDate: Date,
        public isPublished: boolean
        ) {}
}
