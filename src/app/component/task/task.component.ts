import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Task} from '../../model/task.model';
import {TaskService} from '../../service/task.service';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  standalone: true,
  styleUrls: ['./task.component.css'],
  imports: [
    DatePipe,
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    NgClass
  ]
})
export class TaskComponent implements OnInit {
  form!: FormGroup;
  tasks: Task[] = [];
  loading = false;
  editingTaskId: number | null = null;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchTasks();
  }

  initForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [''],
      priority: ['MEDIUM', Validators.required],
    });
  }

  fetchTasks(): void {
    this.loading = true;
    console.log('Fetching tasks for current user...');
    this.taskService.getUserTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        console.log('Tasks loaded:', data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load tasks:', err);
        this.loading = false;
      }
    })
  }

  submit(): void {
    if (this.form.invalid) return;

    const task: Task = {
      ...this.form.value,
      dueDate: this.form.value.dueDate ? new Date(this.form.value.dueDate) : undefined,
    };

    this.loading = true;
    if (this.editingTaskId) {
      console.log('Updating task:', task);
      this.taskService.update(this.editingTaskId, task).subscribe({
        next: (updated) => {
          console.log('Task updated:', updated);
          this.resetForm();
          this.fetchTasks();
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.loading = false;
        },
      });
    } else {
      console.log('Creating task:', task);
      this.taskService.create(task).subscribe({
        next: (created: any) => {
          console.log('Task created:', created);
          this.resetForm();
          this.fetchTasks();
        },
        error: (err: any) => {
          console.error('Create failed:', err);
          this.loading = false;
        },
      });
    }
  }

  edit(task: Task): void {
    this.editingTaskId = task.id!;
    this.form.patchValue({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().substring(0, 10) : '',
    });
    console.log('Editing task:', task);
  }
  resetForm(): void {
    this.editingTaskId = null;
    this.form.reset({ priority: 'MEDIUM' });
    this.loading = false;
  }

  deleteTask(taskId: number): void {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) return;

    this.loading = true;
    this.taskService.delete(taskId).subscribe({
      next: () => {
        console.log('Task deleted:', taskId);
        this.fetchTasks(); // recharge la liste
      },
      error: (err) => {
        console.error('Delete failed:', err);
        this.loading = false;
      }
    });
  }



}
