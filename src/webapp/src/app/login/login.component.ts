import { Component, OnInit, } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { ApiServiceService } from '../shared/api-service.service';
import { Credentials } from '../model/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private apiService: ApiServiceService, private loginService: LoginService, private router: Router) { }

  public username: string;
  public password: string;

  visible: boolean = false;

  ngOnInit() {
  }

  public login(){
    this.apiService.login(new Credentials(this.username, this.password)).subscribe(async (response) => {
      if(response){
        this.loginService.setLogin(this.username, this.password);
        this.router.navigate(['/beginning']);
      }else{
        this.visible = true;
        await this.delay(3000);
        this.visible=false;
      }
    })
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
