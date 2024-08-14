import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

/* Add a storage type to Firestore */
const addStorageType = async (storageTypeName) => {
  try {
    const storagesCollection = collection(db, 'storages');
    await addDoc(storagesCollection, {
      name: storageTypeName,
    });
  } catch (error) {
    console.error('Error adding storage type:', error);
    // Handle the error (e.g., show a message to the user)
  }
};

export default addStorageType;
