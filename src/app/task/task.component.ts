import {Component, OnInit} from '@angular/core';
import {Task} from '../model/Task';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {TaskService} from '../service/task.service';
import {CommonModule, NgForOf} from '@angular/common';


@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;
  isEdit = false;
  isLoading = false; // Nouvelle propriété pour le loading

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      id: [null],
      title: [''],
      description: [''],
      completed: [false]
    });
  }

  ngOnInit() {
    console.log('Initialisation du composant');
    this.loadTasks();
  }

  loadTasks() {
    console.log('Chargement des tâches...');
    this.isLoading = true; // Activation du loading
    this.taskService.getAll().subscribe({
      next: data => {
        console.log('Tâches reçues:', data);
        this.tasks = data;
        this.isLoading = false; // Désactivation du loading
      },
      error: err => {
        console.error('Erreur lors du chargement:', err);
        this.isLoading = false; // Désactivation du loading en cas d'erreur
      }
    });
  }

  save() {
    this.isLoading = true; // Activation du loading
    const task = this.taskForm.value;
    const saveObservable = this.isEdit && task.id
      ? this.taskService.update(task)
      : this.taskService.save(task);

    saveObservable.subscribe({
      next: () => {
        this.loadTasks();
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de la sauvegarde:', err);
        this.isLoading = false;
      }
    });
  }

  edit(task: Task) {
    this.isEdit = true;
    this.taskForm.patchValue(task);
  }

  delete(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      this.isLoading = true; // Activation du loading
      this.taskService.delete(id).subscribe({
        next: () => this.loadTasks(),
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
          this.isLoading = false;
        }
      });
    }
  }

  resetForm() {
    this.taskForm.reset({ completed: false });
    this.isEdit = false;
  }
}
