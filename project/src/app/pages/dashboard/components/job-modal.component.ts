import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Job } from '../../../services/job.service';

@Component({
  selector: 'app-job-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>{{ job ? 'Edit Job' : 'Create New Job' }}</h2>
          <button class="btn-close" (click)="close.emit()">×</button>
        </div>

        <form [formGroup]="jobForm" (ngSubmit)="onSubmit()">
          <!-- Form content -->
        </form>
      </div>
    </div>
  `
})
export class JobModalComponent {
  @Input() job?: Job;
  @Input() selectedDate?: Date;
  @Output() save = new EventEmitter<Partial<Job>>();
  @Output() close = new EventEmitter<void>();

  jobForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      scheduledDate: [null],
      status: ['pending']
    });
  }

  ngOnInit() {
    if (this.job) {
      this.jobForm.patchValue(this.job);
    } else if (this.selectedDate) {
      this.jobForm.patchValue({ scheduledDate: this.selectedDate });
    }
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.save.emit(this.jobForm.value);
    }
  }
}