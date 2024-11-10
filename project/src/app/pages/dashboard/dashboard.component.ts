import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JobService, Job } from '../../services/job.service';
import { Observable } from 'rxjs';
import { DashboardSidebarComponent } from './components/dashboard-sidebar.component';
import { DashboardHeaderComponent } from './components/dashboard-header.component';
import { JobListComponent } from './components/job-list.component';
import { JobModalComponent } from './components/job-modal.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardSidebarComponent,
    DashboardHeaderComponent,
    JobListComponent,
    JobModalComponent
  ],
  template: `
    <div class="dashboard-layout">
      <app-dashboard-sidebar></app-dashboard-sidebar>
      
      <div class="dashboard-main">
        <app-dashboard-header></app-dashboard-header>
        
        <main class="dashboard-content">
          <div class="dashboard-header">
            <h1>Dashboard</h1>
            <button class="btn btn-primary" (click)="showJobModal = true">
              New Job
            </button>
          </div>

          <div class="dashboard-grid">
            <div class="dashboard-card">
              <h3>Active Jobs</h3>
              <p class="dashboard-number">{{ (jobs$ | async)?.length || 0 }}</p>
            </div>
            
            <div class="dashboard-card">
              <h3>Scheduled Today</h3>
              <p class="dashboard-number">{{ getTodayJobs() }}</p>
            </div>
            
            <div class="dashboard-card">
              <h3>Completed This Week</h3>
              <p class="dashboard-number">{{ getCompletedJobs() }}</p>
            </div>
          </div>

          <ng-container *ngIf="jobs$ | async as jobs">
            <app-job-list 
              [jobs]="jobs"
              (editJob)="editJob($event)"
              (deleteJob)="deleteJob($event)"
            ></app-job-list>
          </ng-container>
        </main>
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
    .dashboard-layout {
      display: flex;
      height: 100vh;
    }

    .dashboard-main {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
      background-color: var(--light);
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 1.875rem;
      font-weight: 600;
      color: var(--gray-900);
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .dashboard-card {
      background: white;
      padding: 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .dashboard-card h3 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--gray-600);
      margin-bottom: 0.5rem;
    }

    .dashboard-number {
      font-size: 2rem;
      font-weight: 600;
      color: var(--gray-900);
    }
  `]
})
export class DashboardComponent implements OnInit {
  jobs$: Observable<Job[]>;
  showJobModal = false;
  selectedJob?: Job;

  constructor(
    private jobService: JobService,
    private authService: AuthService
  ) {
    this.jobs$ = this.jobService.getJobs();
  }

  ngOnInit() {
    // Initial setup if needed
  }

  getTodayJobs(): number {
    return 0; // Implement today's jobs count
  }

  getCompletedJobs(): number {
    return 0; // Implement completed jobs count
  }

  editJob(job: Job) {
    this.selectedJob = job;
    this.showJobModal = true;
  }

  async deleteJob(job: Job) {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await this.jobService.deleteJob(job.id!);
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  }

  async saveJob(jobData: Partial<Job>) {
    try {
      if (this.selectedJob) {
        await this.jobService.updateJob(this.selectedJob.id!, jobData);
      } else {
        await this.jobService.createJob(jobData);
      }
      this.closeJobModal();
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }

  closeJobModal() {
    this.showJobModal = false;
    this.selectedJob = undefined;
  }
}