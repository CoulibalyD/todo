import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    window.location.href = '/login';
  }
}

