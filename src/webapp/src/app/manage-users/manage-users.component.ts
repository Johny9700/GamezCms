import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../model/user-dto';
import { ApiServiceService } from '../shared/api-service.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  users: UserDTO[];
  myLogin: string

  constructor(private apiService: ApiServiceService, private loginService: LoginService) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe(users => {this.users = users})
    this.myLogin = this.loginService.login;
  }

  setRole(id: number, role: string){
    this.apiService.changeUserRole(new UserDTO(id, '', '', role)).subscribe(response => {
      this.apiService.getUsers().subscribe(users => {this.users = users})
    })
  }

}
