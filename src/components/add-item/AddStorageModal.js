import React, { useState } from 'react';
import Modal from 'react-modal';
import addStorageType from '../../utils/AddStorageUtils';
import * as PropTypes from 'prop-types';
import { Input } from './Input';

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};

const AddStorageModal = ({ isOpen, onRequestClose }) => {
  const [storageTypeName, setStorageTypeName] = useState('');

  const handleAddStorageType = async () => {
    // Add validation logic if needed
    await addStorageType(storageTypeName);
    // Optionally, you can close the modal after adding the storage type
    onRequestClose();
    /*Refresh the page*/
    window.location.reload();
  };

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
