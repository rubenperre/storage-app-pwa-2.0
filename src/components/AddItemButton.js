import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

const AddItemButton = ({ onClick, type }) => {
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    const fetchIcon = async () => {
      const name = type.toLocaleLowerCase();

      try {
        const iconRef = ref(storage, `storage-images/${name}.png`);
        const url = await getDownloadURL(iconRef);
        setIconUrl(url);
      } catch (error) {
        console.error(`Error fetching icon for type ${type}:`, error);
      }
    };

    fetchIcon();
  }, [type]);

  return (
    <button
      className="add-item-button glass-block"
      onClick={() => onClick(type)}
    >
      <div className="flex flex-column">
        <FaPlus />
        {iconUrl ? <img src={iconUrl} alt={type} /> : 'No icon found'}
        <p>{type}</p>
      </div>
    </button>
  );
};

export default AddItemButton;
