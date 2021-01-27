import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDTO } from 'src/app/model/article-dto';
import { GenreDTO } from 'src/app/model/genre-dto';
import { UserDTO } from 'src/app/model/user-dto';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-modify-article',
  templateUrl: './modify-article.component.html',
  styleUrls: ['./modify-article.component.scss']
})
export class ModifyArticleComponent implements OnInit {
  title: string;
  genre: string;
  content: string;
  date: Date;
  isPublished: boolean = false;

  user: UserDTO;
  genres: GenreDTO[];

  isError: boolean = false;

  public articleId: number;

  constructor(private apiService: ApiServiceService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.articleId = +this.route.snapshot.paramMap.get('article-id');
    this.apiService.getGenres().subscribe((response) => {
      this.genres = response;
    })
    this.apiService.getUser().subscribe((response) => {
      this.user = response;
    })
    this.apiService.getArticle(this.articleId).subscribe((response) => {
      this.title = response.title;
      this.genre = response.genre.name;
      this.content = response.content;
      this.date = response.publicationDate;
      this.isPublished = response.isPublished;
    })

  }

  updateArticle(){
    if(this.title != '' && this.content!='' && this.user!=null && this.genre!=null && this.date!=null && this.title!=null && this.content!=null){
      this.isError=false;
      for (var chosenGenre of this.genres){
        if(chosenGenre.name === this.genre){
          const article = new ArticleDTO(this.articleId, this.title, this.content, this.user, chosenGenre, this.date, this.isPublished);
          console.log(article);
          this.apiService.updateArticle(article).subscribe((response) => {
            if (response === true){
              this.router.navigate(['admin']);
            }else{
              this.isError=true;
            }
          })
        }
      };

    }else{
      this.isError=true;
    }
  }
}
