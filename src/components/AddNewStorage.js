import { FaPlus } from 'react-icons/fa';
import AddStorageModal from './add-item/AddStorageModal';
import React, { useState } from 'react';

function AddNewStorage() {
  const [isAddStorageModalOpen, setIsAddStorageModalOpen] = useState(false);

  const handleAddNewStorage = () => {
    setIsAddStorageModalOpen(true);
  };

  return (
    <section className="add-new-storage">
      <header>
        <h3>Add a New Storage</h3>
      </header>
      <button
        className="add-item-button glass-block flex center"
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
  );
}

export default AddNewStorage;
