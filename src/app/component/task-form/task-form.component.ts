import { Component } from '@angular/core';

@Component({
  selector: 'app-task-form',
  imports: [],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  openCreateModal(): void {
    // Code pour ouvrir une modale
    console.log('Modal de création ouverte');
  }

}
