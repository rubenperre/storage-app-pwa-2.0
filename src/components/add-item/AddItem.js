import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaPlus } from 'react-icons/fa';
import AddItemButton from '../AddItemButton';
import AddItemModal from './AddItemModal';
import AddStorageModal from './AddStorageModal';

function AddItem() {
  const [storageTypes, setStorageTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [isAddStorageModalOpen, setIsAddStorageModalOpen] = useState(false); // Added state for Add Storage Modal

  useEffect(() => {
    const fetchStorageTypes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'storages'));
        const types = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStorageTypes(types);
      } catch (error) {
        console.error('Error fetching storage types:', error);
      }
    };

    fetchStorageTypes();
  }, []);

  const handleStorageButtonClick = (type) => {
    setSelectedType(type);
    console.log('selected type', type);
    setIsModalOpen(true);
  };

  const handleAddNewStorage = () => {
    setIsAddStorageModalOpen(true);
  };

  const handleFileChange = (e) => {
    // Handle file change
  };

  const handleFileUpload = async () => {
    // Handle file upload
  };

  return (
    <>
      <section className="flex flex-wrap add-buttons-container ">
        <header className="hide">
          <h3>Add Item by type</h3>
        </header>
        {storageTypes.map((type) => (
          <AddItemButton
            key={type.id}
            onClick={() => handleStorageButtonClick(type)}
            type={type.name}
          />
        ))}

        {/*modal to add an item*/}
        <AddItemModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          selectedType={selectedType}
        />
        <button
          className="add-item-button glass-block"
          onClick={handleAddNewStorage}
        >
          <FaPlus /> Add New Storage
        </button>

        {/*modal to add a new type of storage*/}
        <AddStorageModal
          isOpen={isAddStorageModalOpen}
          onRequestClose={() => setIsAddStorageModalOpen(false)}
        />
      </section>
      {/*      <section>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
      </section>*/}
    </>
  );
}

export default AddItem;
