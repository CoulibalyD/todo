import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {User} from '../../model/user.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe({
      next: user => this.user = user,
      error: err => console.error('Erreur lors de la récupération du profil :', err)
    });
  }
}
