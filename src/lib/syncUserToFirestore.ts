import { db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

export const syncUserToFirestore = async (
  user: User,
  authType: 'emailAuth' | 'googleAuth'
) => {
  if (!user || !user.uid) return;

  const userRef = doc(db, 'users', user.uid);
  const existing = await getDoc(userRef);

  if (!existing.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      name: user.displayName || 'Anonymous',
      authType,
      createdAt: new Date().toISOString(),
    });
    console.log('✅ User created in Firestore');
  } else {
    console.log('🔁 User already exists');
  }
};
