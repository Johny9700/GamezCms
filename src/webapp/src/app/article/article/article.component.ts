import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDTO } from '../../model/article-dto';
import { ApiServiceService } from '../../shared/api-service.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiServiceService) { }

  public articleId: number;
  public article: ArticleDTO;
  public genre = '<h1>Dupa </h1> <b>elo<b>'

  ngOnInit() {
    this.articleId = +this.route.snapshot.paramMap.get('article-id');
    this.apiService.getArticle(this.articleId).subscribe(articleData => {this.article = articleData});
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

}
