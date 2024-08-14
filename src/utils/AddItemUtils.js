import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
/*Add an item to Firestore*/
const addItem = async (
  itemName,
  itemType,
  itemStorage,
  itemBuyDate,
  itemExpireDate
) => {
  try {
    const itemsCollection = collection(db, 'items');
    await addDoc(itemsCollection, {
      name: itemName,
      type: itemType,
      storage: itemStorage,
      buyDate: itemBuyDate,
      expireDate: itemExpireDate,
    });
  } catch (error) {
    console.error('Error adding item:', error);
    // Handle the error (e.g., show a message to the user)
  }
};
export default addItem;
