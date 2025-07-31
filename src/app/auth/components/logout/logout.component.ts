import { Component, OnInit } from '@angular/core';
import { AppAuthService } from '../../services/app-auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AppAuthService) {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
