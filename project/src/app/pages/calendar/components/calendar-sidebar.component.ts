import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../services/job.service';

@Component({
  selector: 'app-calendar-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="calendar-sidebar">
      <div class="sidebar-section">
        <h3>Today's Schedule</h3>
        <div class="job-list">
          <div *ngFor="let job of todayJobs" class="job-item">
            <div class="job-time">
              {{ formatTime(job.scheduledDate) }}
            </div>
            <div class="job-info">
              <h4>{{ job.title }}</h4>
              <p>{{ job.description }}</p>
            </div>
          </div>
          <div *ngIf="!todayJobs.length" class="empty-state">
            No jobs scheduled for today
          </div>
        </div>
      </div>

      <div class="sidebar-section">
        <h3>Upcoming Jobs</h3>
        <div class="job-list">
          <div *ngFor="let job of upcomingJobs" class="job-item">
            <div class="job-date">
              {{ formatDate(job.scheduledDate) }}
            </div>
            <div class="job-info">
              <h4>{{ job.title }}</h4>
              <p>{{ job.description }}</p>
            </div>
          </div>
          <div *ngIf="!upcomingJobs.length" class="empty-state">
            No upcoming jobs
          </div>
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .calendar-sidebar {
      width: 300px;
      background: white;
      border-right: 1px solid var(--gray-200);
      padding: 1.5rem;
      overflow-y: auto;
    }

    .sidebar-section {
      margin-bottom: 2rem;
    }

    .sidebar-section h3 {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gray-900);
      margin-bottom: 1rem;
    }

    .job-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .job-item {
      padding: 1rem;
      background: var(--gray-50);
      border-radius: 0.375rem;
    }

    .job-time {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--primary);
      margin-bottom: 0.5rem;
    }

    .job-date {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-600);
      margin-bottom: 0.5rem;
    }

    .job-info h4 {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
    }

    .job-info p {
      font-size: 0.75rem;
      color: var(--gray-600);
    }

    .empty-state {
      text-align: center;
      padding: 1rem;
      color: var(--gray-500);
      font-size: 0.875rem;
      background: var(--gray-50);
      border-radius: 0.375rem;
    }
  `]
})
export class CalendarSidebarComponent {
  @Input() jobs: Job[] = [];
  @Output() dateSelected = new EventEmitter<Date>();

  get todayJobs(): Job[] {
    const today = new Date();
    return this.jobs.filter(job => {
      const jobDate = new Date(job.scheduledDate!);
      return (
        jobDate.getFullYear() === today.getFullYear() &&
        jobDate.getMonth() === today.getMonth() &&
        jobDate.getDate() === today.getDate()
      );
    }).sort((a, b) => {
      return new Date(a.scheduledDate!).getTime() - new Date(b.scheduledDate!).getTime();
    });
  }

  get upcomingJobs(): Job[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.jobs.filter(job => {
      const jobDate = new Date(job.scheduledDate!);
      jobDate.setHours(0, 0, 0, 0);
      return jobDate > today;
    }).sort((a, b) => {
      return new Date(a.scheduledDate!).getTime() - new Date(b.scheduledDate!).getTime();
    }).slice(0, 5);
  }

  formatTime(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('default', {
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('default', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
}