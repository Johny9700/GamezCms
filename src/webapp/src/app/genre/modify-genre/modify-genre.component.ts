import { Component, OnInit } from '@angular/core';
import { GenreDTO } from 'src/app/model/genre-dto';
import { MenuGenreDTO } from 'src/app/model/menu-genre-dto';
import { ApiServiceService } from 'src/app/shared/api-service.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-modify-genre',
  templateUrl: './modify-genre.component.html',
  styleUrls: ['./modify-genre.component.scss']
})
export class ModifyGenreComponent implements OnInit {

  genres: GenreDTO[];

  newGenre: string = '';

  addError: boolean = false;
  deleteError: boolean = false;

  constructor(private apiService: ApiServiceService, private loginService: LoginService) { }

  ngOnInit() {
    this.apiService.getGenres().subscribe(gen => {this.genres = gen});
  }

  createGenre(){
    if(this.newGenre != ''){
      const genre = new MenuGenreDTO(-1, this.newGenre, []);
      this.apiService.addGenre(genre).subscribe(gen => {
        this.addError = gen
        if(!this.addError){
          this.newGenre = '';
        }
        this.apiService.getGenres().subscribe(gen => {this.genres = gen});
        this.apiService.getMenu().subscribe(menu => {this.loginService.updateMenu(menu);})
      });
    }
  }

  allowEditionGenre(genre: GenreDTO){
    genre.edit=true;
  }

  editGenre(genre: GenreDTO){
    genre.edit=false;
    const sendgenre = new MenuGenreDTO(genre.id, genre.name, []);
    this.apiService.editGenre(sendgenre).subscribe(gen => {
      this.deleteError = gen
      this.apiService.getGenres().subscribe(gen => {this.genres = gen});
      this.apiService.getMenu().subscribe(menu => {this.loginService.updateMenu(menu);})
    });
  }

  deleteGenre(genreId: number){
    const genre = new MenuGenreDTO(genreId, '', []);
    this.apiService.deleteGenre(genre).subscribe(gen => {
      this.deleteError = gen
      this.apiService.getGenres().subscribe(gen => {this.genres = gen});
      this.apiService.getMenu().subscribe(menu => {this.loginService.updateMenu(menu);})
    });
  }

}
