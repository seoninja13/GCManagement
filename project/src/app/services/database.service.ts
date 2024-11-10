import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs 
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private firestore: Firestore,
    private auth: AuthService
  ) {}

  // Clients
  async addClient(clientData: any) {
    const user = await this.auth.getCurrentUser();
    const clientsRef = collection(this.firestore, 'clients');
    return addDoc(clientsRef, {
      ...clientData,
      userId: user?.uid,
      createdAt: new Date()
    });
  }

  async getClients() {
    const user = await this.auth.getCurrentUser();
    const clientsRef = collection(this.firestore, 'clients');
    const q = query(clientsRef, where('userId', '==', user?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  // Jobs
  async addJob(jobData: any) {
    const user = await this.auth.getCurrentUser();
    const jobsRef = collection(this.firestore, 'jobs');
    return addDoc(jobsRef, {
      ...jobData,
      userId: user?.uid,
      status: 'pending',
      createdAt: new Date()
    });
  }

  async getJobs() {
    const user = await this.auth.getCurrentUser();
    const jobsRef = collection(this.firestore, 'jobs');
    const q = query(jobsRef, where('userId', '==', user?.uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async updateJobStatus(jobId: string, status: string) {
    const jobRef = doc(this.firestore, 'jobs', jobId);
    return updateDoc(jobRef, { status });
  }

  // Delete operations
  async deleteClient(clientId: string) {
    const clientRef = doc(this.firestore, 'clients', clientId);
    return deleteDoc(clientRef);
  }

  async deleteJob(jobId: string) {
    const jobRef = doc(this.firestore, 'jobs', jobId);
    return deleteDoc(jobRef);
  }
}