import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuGenreDTO } from '../model/menu-genre-dto';
import { ApiServiceService } from './api-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private messageSourceMenu = new BehaviorSubject([]);
  currentMessageMenu = this.messageSourceMenu.asObservable();

  private messageSourceLogin = new BehaviorSubject('');
  private messageSourcePassword = new BehaviorSubject('');
  currentMessageLogin = this.messageSourceLogin.asObservable();
  currentMessagePassword = this.messageSourcePassword.asObservable();
  public login:string ='';
  public password:string ='';

  constructor() { }

  updateMenu(menu: MenuGenreDTO[]){
    this.messageSourceMenu.next(menu)
  }

  setLogin(login: string, password: string) {
    this.messageSourceLogin.next(login);
    this.messageSourcePassword.next(password);
    this.login = login;
    this.password = password;
  }

  logout() {
    this.messageSourceLogin.next(null);
    this.messageSourcePassword.next(null);
    this.login = '';
  }

  isLoggedUser(){
    return this.login != '';
  }
}
