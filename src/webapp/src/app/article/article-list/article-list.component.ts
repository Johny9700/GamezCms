import { Component, OnInit } from '@angular/core';
import { MenuGenreDTO } from 'src/app/model/menu-genre-dto';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  menuItems: MenuGenreDTO[];

  constructor(private apiService: ApiServiceService,) { }

  ngOnInit() {
    this.apiService.getMenu().subscribe(menu => {this.menuItems = menu})
  }

}
