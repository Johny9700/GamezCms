import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleDTO } from 'src/app/model/article-dto';
import { GenreDTO } from 'src/app/model/genre-dto';
import { UserDTO } from 'src/app/model/user-dto';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  title: string;
  genre: string;
  content: string;
  date: Date;
  isPublished: boolean = false;

  user: UserDTO;
  genres: GenreDTO[];

  isError: boolean = false;


  constructor(private apiService: ApiServiceService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.apiService.getGenres().subscribe((response) => {
      this.genres = response;
    })
    this.apiService.getUser().subscribe((response) => {
      this.user = response;
    })

  }

  createArticle(){
    if(this.title != '' && this.content!='' && this.user!=null && this.genre!=null && this.date!=null && this.title!=null && this.content!=null){
      this.isError=false;
      for (var chosenGenre of this.genres){
        if(chosenGenre.name === this.genre){
          const article = new ArticleDTO(-1, this.title, this.content, this.user, chosenGenre, this.date, this.isPublished);
          console.log(article);
          this.apiService.addArticle(article).subscribe((response) => {
            if (response === true){
              this.apiService.getMenu().subscribe(menu => {this.loginService.updateMenu(menu);})
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
