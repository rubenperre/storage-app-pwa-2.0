import React, { useEffect, useState } from 'react';
import {
  calculatePercentage,
  getItems,
  handleDeleteItem,
} from '../../utils/StorageUtils';
import { Link } from 'react-router-dom';
import Item from './Item';
import '../../styles/storage.scss';
import { FaPlus } from 'react-icons/fa';

function Storage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems(setItems);
  }, []);

  const handleDelete = async (itemId) => {
    await handleDeleteItem(itemId, () => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    });
  };

  return (
    <section className="flex flex-center">
      <header>
        <h3 className="hide">items</h3>
      </header>
      <article className=" flex flex-column items-content">
        {items?.length ? (
          <>
            {items.map((item) => {
              const buyDate = new Date(item.buyDate);
              const expireDate = new Date(item.expireDate);

              const percentage = calculatePercentage(buyDate, expireDate);
              const daysToExpire = Math.ceil(
                (expireDate - Date.now()) / (24 * 60 * 60 * 1000)
              );

              const expireProgress =
                percentage >= 100
                  ? 'expired'
                  : percentage >= 75
                    ? 'expiring'
                    : percentage >= 50
                      ? 'okay'
                      : 'new';
              console.log(item);
              return (
                <Item
                  key={item.id}
                  item={item}
                  onClick={() => handleDelete(item.id, setItems)}
                  expireProgress={expireProgress}
                  percentage={percentage}
                  daysToExpire={daysToExpire}
                />
              );
            })}
            <Link to="/add-item" className="glass-block flex add-item-button">
              <FaPlus /> Add Item
            </Link>
          </>
        ) : (
          <p>
            No items in storage.
            <Link to="/add-item">Add an item</Link>.
          </p>
        )}
      </article>
    </section>
  );
}

export default Storage;
