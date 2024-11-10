import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export interface Job {
  id?: string;
  title: string;
  description: string;
  clientId: string;
  userId: string;
  status: 'pending' | 'scheduled' | 'in-progress' | 'completed';
  scheduledDate?: Date;
  estimatedDuration?: number;
  price?: number;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getJobs(): Observable<Job[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user?.uid) return [];
        return this.firestore
          .collection<Job>('jobs', ref => 
            ref.where('userId', '==', user.uid)
               .orderBy('scheduledDate', 'desc'))
          .valueChanges({ idField: 'id' });
      })
    );
  }

  async createJob(job: Partial<Job>): Promise<string> {
    const user = await this.authService.user$.pipe(map(u => u?.uid)).toPromise();
    if (!user) throw new Error('User not authenticated');

    const jobData: Job = {
      title: job.title || '',
      description: job.description || '',
      clientId: job.clientId || '',
      userId: user,
      status: job.status || 'pending',
      scheduledDate: job.scheduledDate,
      estimatedDuration: job.estimatedDuration,
      price: job.price,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await this.firestore.collection('jobs').add(jobData);
    return docRef.id;
  }

  updateJob(jobId: string, updates: Partial<Job>): Promise<void> {
    return this.firestore.collection('jobs').doc(jobId).update({
      ...updates,
      updatedAt: new Date()
    });
  }

  deleteJob(jobId: string): Promise<void> {
    return this.firestore.collection('jobs').doc(jobId).delete();
  }

  getJobById(jobId: string): Observable<Job | undefined> {
    return this.firestore
      .collection('jobs')
      .doc<Job>(jobId)
      .valueChanges();
  }
}