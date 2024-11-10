import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService, Job } from '../../services/job.service';
import { CalendarViewComponent } from './components/calendar-view.component';
import { CalendarSidebarComponent } from './components/calendar-sidebar.component';
import { JobModalComponent } from '../dashboard/components/job-modal.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarViewComponent,
    CalendarSidebarComponent,
    JobModalComponent
  ],
  template: `
    <div class="calendar-layout">
      <app-calendar-sidebar
        [jobs]="jobs"
        (dateSelected)="onDateSelected($event)"
      ></app-calendar-sidebar>

      <div class="calendar-main">
        <div class="calendar-header">
          <div class="calendar-nav">
            <button class="btn btn-secondary" (click)="previousMonth()">
              ← Previous
            </button>
            <h2>{{ currentMonthYear }}</h2>
            <button class="btn btn-secondary" (click)="nextMonth()">
              Next →
            </button>
          </div>
          <button class="btn btn-primary" (click)="showJobModal = true">
            Schedule Job
          </button>
        </div>

        <app-calendar-view
          [currentDate]="currentDate"
          [jobs]="jobs"
          (daySelected)="onDaySelected($event)"
          (jobSelected)="onJobSelected($event)"
        ></app-calendar-view>
      </div>
    </div>

    <app-job-modal
      *ngIf="showJobModal"
      [job]="selectedJob"
      (save)="saveJob($event)"
      (close)="closeJobModal()"
    ></app-job-modal>
  `,
  styles: [`
    .calendar-layout {
      display: flex;
      height: calc(100vh - 64px);
    }

    .calendar-main {
      flex: 1;
      padding: 2rem;
      background-color: var(--light);
      overflow-y: auto;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .calendar-nav {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .calendar-nav h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--gray-900);
      min-width: 200px;
      text-align: center;
    }
  `]
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  selectedDate?: Date;
  selectedJob?: Job;
  showJobModal = false;
  jobs: Job[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit() {
    this.loadJobs();
  }

  get currentMonthYear(): string {
    return this.currentDate.toLocaleString('default', { 
      month: 'long', 
      year: 'numeric' 
    });
  }

  async loadJobs() {
    this.jobService.getJobs().subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  previousMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
  }

  nextMonth() {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
  }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    this.showJobModal = true;
  }

  onDaySelected(date: Date) {
    this.selectedDate = date;
    this.showJobModal = true;
  }

  onJobSelected(job: Job) {
    this.selectedJob = job;
    this.showJobModal = true;
  }

  async saveJob(jobData: Partial<Job>) {
    try {
      if (this.selectedJob) {
        await this.jobService.updateJob(this.selectedJob.id!, jobData);
      } else {
        await this.jobService.createJob({
          ...jobData,
          scheduledDate: this.selectedDate
        });
      }
      this.closeJobModal();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }

  closeJobModal() {
    this.showJobModal = false;
    this.selectedJob = undefined;
    this.selectedDate = undefined;
  }
}