import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';

export const fetchStorageTypes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'storages'));
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (error) {
    console.error('Error fetching storage types:', error);
    throw error;
  }
};
