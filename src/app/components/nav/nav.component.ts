import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean = false;
  userProfile: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.userProfile$.subscribe((profile) => {
      this.userProfile = profile;
    });
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
