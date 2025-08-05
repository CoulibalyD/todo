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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authSub = this.authService.authStatus$.subscribe(status => {
      this.isAuthenticated = status;
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
