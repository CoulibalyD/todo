import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIf, NgClass, NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf, NgOptimizedImage, NgClass],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isMenuOpen = false;
  private authSub!: Subscription;

  username: string | null = null;
  role: string | null = null;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;

      if(status){
        const user =  this.authService.getUserFromToken();
        this.username = user?.sub ?? null
        this.role = user.role?.role ?? null;
      } else {
        this.username = null;
        this.role = null;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
    window.location.href = '/login';
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
