import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  dataUser: any;
  dataToken: any;

  constructor(
    private authService: AuthService,
    private _router: Router
  ) {
    this.dataUser = this.authService.dataUser();
    this.dataToken = this.authService.dataToken();
  }

  ngOnInit() {
    if (this.dataUser == null) {
      this._router.navigate(['/login']);
      return false;
    }
  }

}
