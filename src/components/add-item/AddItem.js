import React, { useEffect, useState } from 'react';

import AddItemButton from '../AddItemButton';
import AddItemModal from './AddItemModal';
import { fetchStorageTypes } from '../../utils/fetchStorageTypes';

function AddItem() {
  const [storageTypes, setStorageTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    const getStorageTypes = async () => {
      try {
        const types = await fetchStorageTypes();
        setStorageTypes(types);
      } catch (error) {
        console.error('Error fetching storage types:', error);
      }
    };

    getStorageTypes();
  }, []);

  const handleStorageButtonClick = (type) => {
    setSelectedType(type);
    console.log('selected type', type);
    setIsModalOpen(true);
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
      </section>
    </>
  );
}

export default AddItem;
