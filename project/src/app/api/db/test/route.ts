import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export async function GET() {
  try {
    // Test write operation
    const testCollection = collection(db, 'test');
    await addDoc(testCollection, {
      message: 'Test connection',
      timestamp: new Date().toISOString()
    });

    // Test read operation
    const snapshot = await getDocs(testCollection);
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return NextResponse.json({ 
      success: true, 
      message: 'Firebase connection successful',
      data 
    });
  } catch (error) {
    console.error('Database test failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}