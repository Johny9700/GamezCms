import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Credentials } from '../model/credentials';
import { Observable } from 'rxjs';
import { MenuGenreDTO } from '../model/menu-genre-dto';
import { ArticleDTO } from '../model/article-dto';
import { RegisterCredentials } from '../model/register-credentials';
import { UserDTO } from '../model/user-dto';
import { LoginService } from './login.service';
import { GenreDTO } from '../model/genre-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private readonly MENU_URL = "/api/menu"; 
  private readonly ARTICLE_URL = "/api/article"; 
  private readonly LOGIN_URL = "/api/login";
  private readonly REGISTER_URL = "/api/register";
  private readonly USER_URL = "/api/user";
  private readonly GENRE_URL = "/api/genres";
  private readonly ADD_GENRE_URL = "/api/add-genre";
  private readonly DELETE_GENRE_URL = "/api/delete-genre";
  private readonly EDIT_GENRE_URL = "/api/edit-genre";
  private readonly ADD_ARTICLE_URL = "/api/add-article";
  private readonly UPDATE_ARTICLE_URL = "/api/modify-article";
  private readonly ALL_USERS_URL = "/api/users";
  private readonly CHANGE_USER_ROLE_URL = "/api/change-role";
  

  constructor(private http: HttpClient, private loginService: LoginService) { }

  login(credentials: Credentials): Observable<Boolean>{
    const body = JSON.stringify(credentials);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Boolean>(this.LOGIN_URL, body, { headers: headers });
  }

  register(credentials: RegisterCredentials): Observable<Boolean>{
    const body = JSON.stringify(credentials);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Boolean>(this.REGISTER_URL, body, { headers: headers });
  }

  getMenu(): Observable<MenuGenreDTO[]>{
    return this.http.get<MenuGenreDTO[]>(this.MENU_URL);
  }

  getArticle(articleId: number): Observable<ArticleDTO>{
    return this.http.get<ArticleDTO>(this.ARTICLE_URL + "?id=" + articleId);
  }

  getUser(): Observable<UserDTO>{
    const body = JSON.stringify(new Credentials(this.loginService.login, this.loginService.password));
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UserDTO>(this.USER_URL, body, { headers: headers });
  }

  getGenres(): Observable<GenreDTO[]>{
    const body = JSON.stringify(new Credentials(this.loginService.login, this.loginService.password));
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<GenreDTO[]>(this.GENRE_URL, body, { headers: headers });
  }

  addGenre(genre: MenuGenreDTO): Observable<boolean>{
    const body = JSON.stringify(genre);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'login': this.loginService.login, 'password': this.loginService.password});
    return this.http.post<boolean>(this.ADD_GENRE_URL, body, { headers: headers });
  }

  deleteGenre(genre: MenuGenreDTO): Observable<boolean>{
    const body = JSON.stringify(genre);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'login': this.loginService.login, 'password': this.loginService.password});
    return this.http.post<boolean>(this.DELETE_GENRE_URL, body, { headers: headers });
  }

  editGenre(genre: MenuGenreDTO): Observable<boolean>{
    const body = JSON.stringify(genre);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'login': this.loginService.login, 'password': this.loginService.password});
    return this.http.post<boolean>(this.EDIT_GENRE_URL, body, { headers: headers });
  }

  addArticle(article: ArticleDTO): Observable<boolean>{
    const body = JSON.stringify(article);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'login': this.loginService.login, 'password': this.loginService.password});
    return this.http.post<boolean>(this.ADD_ARTICLE_URL, body, { headers: headers });
  }

  updateArticle(article: ArticleDTO): Observable<boolean>{
    const body = JSON.stringify(article);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'login': this.loginService.login, 'password': this.loginService.password});
    return this.http.post<boolean>(this.UPDATE_ARTICLE_URL, body, { headers: headers });
  }

  getUsers(): Observable<UserDTO[]>{
    const body = JSON.stringify(new Credentials(this.loginService.login, this.loginService.password));
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<UserDTO[]>(this.ALL_USERS_URL, body, { headers: headers });
  }

  changeUserRole(user: UserDTO): Observable<boolean>{
    const body = JSON.stringify(user);
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'login': this.loginService.login, 'password': this.loginService.password});
    return this.http.post<boolean>(this.CHANGE_USER_ROLE_URL, body, { headers: headers });
  }

}
