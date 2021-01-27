import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/login.service';
import { Router } from '@angular/router';
import { ApiServiceService } from '../shared/api-service.service';
import { UserDTO } from '../model/user-dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserDTO;

  constructor(private apiService: ApiServiceService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.apiService.getUser().subscribe((response) => {
      this.user = response;
    })
  }

  public logout(){
    this.loginService.logout();
    this.router.navigate(['/beginning']);
  }

}
