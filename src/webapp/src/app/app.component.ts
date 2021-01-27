import { Component } from '@angular/core';
import { faShoppingBasket, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from './shared/login.service';
import { MenuGenreDTO } from './model/menu-genre-dto';
import { ApiServiceService } from './shared/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Gamez CMS';
  basketIcon = faShoppingBasket;
  signInIcon = faSignInAlt;
  user: string;
  menuItems: MenuGenreDTO[];

  constructor(private loginService: LoginService, private apiService: ApiServiceService) { }

  ngOnInit(){
    this.loginService.currentMessageLogin.subscribe(message => this.user = message)
    this.loginService.currentMessageMenu.subscribe(message => this.menuItems = message)
    this.apiService.getMenu().subscribe(menu => {this.loginService.updateMenu(menu);
      this.menuItems = menu})
  }
}
