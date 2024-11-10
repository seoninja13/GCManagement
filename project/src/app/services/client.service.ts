import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Client {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  getClients(): Observable<Client[]> {
    return this.authService.user$.pipe(
      switchMap(user => {
        if (!user?.uid) return [];
        return this.firestore
          .collection<Client>('clients', ref => 
            ref.where('userId', '==', user.uid)
               .orderBy('name', 'asc'))
          .valueChanges({ idField: 'id' });
      })
    );
  }

  async createClient(client: Partial<Client>): Promise<string> {
    const user = await this.authService.user$.pipe().toPromise();
    if (!user) throw new Error('User not authenticated');

    const clientData: Client = {
      ...client as Client,
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const docRef = await this.firestore.collection('clients').add(clientData);
    return docRef.id;
  }

  updateClient(clientId: string, updates: Partial<Client>): Promise<void> {
    return this.firestore.collection('clients').doc(clientId).update({
      ...updates,
      updatedAt: new Date()
    });
  }

  deleteClient(clientId: string): Promise<void> {
    return this.firestore.collection('clients').doc(clientId).delete();
  }

  getClientById(clientId: string): Observable<Client | undefined> {
    return this.firestore
      .collection('clients')
      .doc<Client>(clientId)
      .valueChanges();
  }
}