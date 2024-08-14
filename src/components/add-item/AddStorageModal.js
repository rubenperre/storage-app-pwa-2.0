import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import addStorageType from '../../utils/AddStorageUtils';
import * as PropTypes from 'prop-types';
import { Input } from './Input';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { fetchStorageTypes } from '../../utils/fetchStorageTypes';

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};

const AddStorageModal = ({ isOpen, onRequestClose }) => {
  const [storageTypeName, setStorageTypeName] = useState('');
  const [imageUpload, setImageUpload] = useState(null);

  const [existingStorageTypes, setExistingStorageTypes] = useState([]);

  useEffect(() => {
    const getStorageTypes = async () => {
      try {
        const types = await fetchStorageTypes();
        setExistingStorageTypes(types.map((type) => type.name));
      } catch (error) {
        console.error('Error fetching storage types:', error);
      }
    };

    getStorageTypes();
  }, []);

  const handleFileChange = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const handleAddStorageType = async () => {
    if (!storageTypeName) {
      alert('Please provide a storage type.');
      return;
    }

    if (!imageUpload) {
      const confirmNoImage = window.confirm(
        "Are you sure you don't want to add an image?"
      );
      if (!confirmNoImage) {
        return;
      }
    }

    if (existingStorageTypes.includes(storageTypeName)) {
      alert('Storage type already exists. Please choose a different name.');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `storage-images/${storageTypeName}.png`);
      await uploadBytes(storageRef, imageUpload);
      const fileURL = await getDownloadURL(storageRef);

      await addStorageType(storageTypeName, fileURL);
      onRequestClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding storage type:', error);
      alert('Failed to add storage type.');
    }
  };

  /* const handleAddStorageType = async () => {
   // Add validation logic if needed
   await addStorageType(storageTypeName);
   // Optionally, you can close the modal after adding the storage type
   onRequestClose();
   /!*Refresh the page*!/
   window.location.reload();
   };
   */
  return (
    <Modal className="modal" isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Add a new storage type</h2>
      <form className="flex flex-column">
        <Input
          inputType="text"
          field="Storage Type Name"
          value={storageTypeName}
          onChange={(e) => setStorageTypeName(e.target.value)}
        />

        <label>
          Upload Image:
          <input type="file" accept="image/png" onChange={handleFileChange} />
        </label>

        <button type="button" onClick={handleAddStorageType}>
          Add Storage Type
        </button>

        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddStorageModal;
