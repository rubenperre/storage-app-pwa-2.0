import { deleteDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
/*Fetch all items from Firestore*/
export const getItems = async (setItems) => {
  const querySnapshot = await getDocs(collection(db, 'items'));
  const newData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  setItems(newData);
  console.log(newData); // Log newData instead of items
  console.log(setItems); // Log setItems instead of newData
};

export const calculatePercentage = (buyDate, expireDate) => {
  const now = new Date();
  const totalDifference = expireDate - buyDate;
  const elapsedDifference = now - buyDate;

  const percentage = (elapsedDifference / totalDifference) * 100;

  return Math.min(100, Math.max(0, percentage));
};

export const handleDeleteItem = async (itemId) => {
  try {
    await deleteDoc(doc(db, 'items', itemId));

    /*Refresh the page*/
    window.location.reload();
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
