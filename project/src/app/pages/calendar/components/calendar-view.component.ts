import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Job } from '../../../services/job.service';

@Component({
  selector: 'app-calendar-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar">
      <div class="calendar-header">
        <div class="weekday" *ngFor="let day of weekDays">{{ day }}</div>
      </div>

      <div class="calendar-grid">
        <div 
          *ngFor="let day of calendarDays" 
          class="calendar-day"
          [class.today]="isToday(day.date)"
          [class.current-month]="isCurrentMonth(day.date)"
          (click)="daySelected.emit(day.date)"
        >
          <div class="day-header">
            <span class="day-number">{{ day.date.getDate() }}</span>
          </div>

          <div class="day-content">
            <div 
              *ngFor="let job of day.jobs" 
              class="job-item"
              [class]="job.status"
              (click)="onJobClick($event, job)"
            >
              {{ job.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar {
      background: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .calendar-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-bottom: 1px solid var(--gray-200);
    }

    .weekday {
      padding: 1rem;
      text-align: center;
      font-weight: 500;
      color: var(--gray-600);
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-right: 1px solid var(--gray-200);
      border-bottom: 1px solid var(--gray-200);
    }

    .calendar-day {
      min-height: 120px;
      padding: 0.5rem;
      border-left: 1px solid var(--gray-200);
      border-top: 1px solid var(--gray-200);
      cursor: pointer;
    }

    .calendar-day:hover {
      background-color: var(--gray-50);
    }

    .day-header {
      margin-bottom: 0.5rem;
    }

    .day-number {
      font-weight: 500;
      color: var(--gray-700);
    }

    .today {
      background-color: var(--gray-50);
    }

    .today .day-number {
      color: var(--primary);
      font-weight: 600;
    }

    .current-month {
      background-color: white;
    }

    :not(.current-month) {
      background-color: var(--gray-50);
      color: var(--gray-400);
    }

    .job-item {
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      margin-bottom: 0.25rem;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .job-item.pending {
      background-color: #FEF3C7;
      color: #92400E;
    }

    .job-item.scheduled {
      background-color: #DBEAFE;
      color: #1E40AF;
    }

    .job-item.in-progress {
      background-color: #D1FAE5;
      color: #065F46;
    }

    .job-item.completed {
      background-color: #E0E7FF;
      color: #3730A3;
    }
  `]
})
export class CalendarViewComponent {
  @Input() currentDate: Date = new Date();
  @Input() jobs: Job[] = [];
  @Output() daySelected = new EventEmitter<Date>();
  @Output() jobSelected = new EventEmitter<Job>();

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  get calendarDays() {
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    const days = [];
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    while (startDate <= lastDay || days.length % 7 !== 0) {
      const date = new Date(startDate);
      days.push({
        date,
        jobs: this.getJobsForDate(date)
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    return days;
  }

  getJobsForDate(date: Date): Job[] {
    return this.jobs.filter(job => {
      const jobDate = new Date(job.scheduledDate!);
      return (
        jobDate.getFullYear() === date.getFullYear() &&
        jobDate.getMonth() === date.getMonth() &&
        jobDate.getDate() === date.getDate()
      );
    });
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  onJobClick(event: Event, job: Job) {
    event.stopPropagation();
    this.jobSelected.emit(job);
  }
}