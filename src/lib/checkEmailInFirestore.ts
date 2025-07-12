import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebaseClient';

export async function checkEmailExistsInFirestore(email: string): Promise<boolean> {
  const q = query(collection(db, 'users'), where('email', '==', email));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
