import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../model/user-dto';
import { ApiServiceService } from '../shared/api-service.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  private user: UserDTO;

  constructor(private apiService: ApiServiceService,) { }

  ngOnInit() {
    this.apiService.getUser().subscribe((response) => {
      this.user = response;
    })
  }

}
