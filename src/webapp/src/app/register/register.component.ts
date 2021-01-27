import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../shared/api-service.service';
import { Router } from '@angular/router';
import { Credentials } from '../model/credentials';
import { RegisterCredentials } from '../model/register-credentials';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public username: string;
  public password: string;
  public password2: string;
  public mail: string;

  visibleError: boolean = false;
  visibleComplete: boolean = false;
  repeatPassword: boolean = false;
  emptyField: boolean = false;

  constructor(private apiService: ApiServiceService) { }

  ngOnInit() {
  }

  public register(){
    if(this.username != null && this.mail != null && this.password != null && this.password2 != null){
      this.emptyField = false;
      if(this.password === this.password2){
        this.repeatPassword = false;
        this.apiService.register(new RegisterCredentials(this.username, this.password, this.mail)).subscribe(async (response) => {
          if(response){
            this.username = "";
            this.password = "";
            this.password2 = "";
            this.mail = "";
            this.visibleComplete = true;
            await this.delay(3000);
            this.visibleComplete=false;
          }else{
            this.visibleError = true;
            await this.delay(3000);
            this.visibleError=false;
          }
        })
      }else{
        this.repeatPassword = true;
      }
    }else{
      this.emptyField = true;
    }


  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
