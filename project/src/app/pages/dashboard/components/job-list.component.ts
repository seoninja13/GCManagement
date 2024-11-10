import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../services/job.service';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="job-list">
      <div class="job-list-header">
        <h2>Recent Jobs</h2>
        <div class="filters">
          <select class="select-filter">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div class="job-table">
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Client</th>
              <th>Status</th>
              <th>Scheduled Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let job of jobs">
              <td>{{ job.title }}</td>
              <td>{{ job.clientId }}</td>
              <td>
                <span class="status-badge" [class]="job.status">
                  {{ job.status }}
                </span>
              </td>
              <td>{{ job.scheduledDate | date }}</td>
              <td>{{ job.price | currency }}</td>
              <td>
                <button class="btn-icon" (click)="onEditJob(job)">✏️</button>
                <button class="btn-icon" (click)="onDeleteJob(job)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [/* ... existing styles ... */]
})
export class JobListComponent {
  @Input() jobs: Job[] = [];
  @Output() editJob = new EventEmitter<Job>();
  @Output() deleteJob = new EventEmitter<Job>();

  onEditJob(job: Job) {
    this.editJob.emit(job);
  }

  onDeleteJob(job: Job) {
    this.deleteJob.emit(job);
  }
}