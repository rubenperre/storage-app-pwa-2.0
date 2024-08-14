import React, { useState } from 'react';
import Modal from 'react-modal';
import addItem from '../../utils/AddItemUtils';
import * as PropTypes from 'prop-types';
import '../../styles/add-items.scss';
import { Input } from './Input';

Input.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  inputType: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};

const AddItemModal = ({ isOpen, onRequestClose, selectedType }) => {
  const [itemName, setItemName] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemBuyDate, setItemBuyDate] = useState('');
  const [itemExpireDate, setItemExpireDate] = useState('');

  const itemStorage = selectedType.name;

  const handleAddItem = async () => {
    // Add validation logic if needed
    await addItem(itemName, itemType, itemStorage, itemBuyDate, itemExpireDate);
    // Optionally, you can close the modal after adding the item
    onRequestClose();
  };

  return (
    <Modal className="modal" isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Add a {itemStorage} item</h2>
      <form className="flex flex-column">
        <Input
          inputType={'text'}
          field={'name'}
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Input
          inputType={'text'}
          field={'type'}
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
        />
        <Input
          inputType={'date'}
          field={'Buy date'}
          value={itemBuyDate}
          onChange={(e) => setItemBuyDate(e.target.value)}
        />
        <Input
          inputType={'date'}
          field={'expire date'}
          value={itemExpireDate}
          onChange={(e) => setItemExpireDate(e.target.value)}
        />
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="button" onClick={onRequestClose}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

export default AddItemModal;
