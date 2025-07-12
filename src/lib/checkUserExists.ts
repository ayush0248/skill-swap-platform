import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function checkUserExists(uid: string): Promise<boolean> {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists();
}
