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
    this.taskService.getAll().subscribe({
      next: data => {
        console.log('Tâches reçues:', data);
        this.tasks = data;
      },
      error: err => console.error('Erreur lors du chargement:', err)
    });
  }

  save() {
    const task = this.taskForm.value;
    if (this.isEdit && task.id) {
      this.taskService.update(task).subscribe(() => {
        this.loadTasks();
        this.resetForm();
      });
    } else {
      this.taskService.save(task).subscribe(() => {
        this.loadTasks();
        this.resetForm();
      });
    }
  }

  edit(task: Task) {
    this.isEdit = true;
    this.taskForm.patchValue(task);
  }

  delete(id: number) {
    if (confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      this.taskService.delete(id).subscribe(() => this.loadTasks());
    }
  }

  resetForm() {
    this.taskForm.reset({ completed: false });
    this.isEdit = false;
  }
}
