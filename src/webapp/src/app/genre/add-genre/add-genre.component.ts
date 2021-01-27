import { Component, OnInit } from '@angular/core';
import { GenreDTO } from 'src/app/model/genre-dto';
import { ApiServiceService } from 'src/app/shared/api-service.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})
export class AddGenreComponent implements OnInit {

  genres: GenreDTO[];

  constructor(private apiService: ApiServiceService,) { }

  ngOnInit() {
    this.apiService.getGenres().subscribe(gen => {this.genres = gen})
  }

}
