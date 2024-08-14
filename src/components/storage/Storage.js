import React, { useEffect, useState } from 'react';
import {
  calculatePercentage,
  getItems,
  handleDeleteItem,
} from '../../utils/StorageUtils';
import { Link } from 'react-router-dom';
import Item from './Item';
import { FaChevronDown, FaChevronLeft, FaPlus } from 'react-icons/fa';

function processItems(items, handleDelete) {
  const expiredItems = [];
  const nonExpiredItems = [];

  items.forEach((item) => {
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

    const itemComponent = (
      <Item
        key={item.id}
        item={item}
        onClick={() => handleDelete(item.id)}
        expireProgress={expireProgress}
        percentage={percentage}
        daysToExpire={daysToExpire}
      />
    );

    if (expireProgress === 'expired') {
      expiredItems.push(itemComponent);
    } else {
      nonExpiredItems.push(itemComponent);
    }
  });

  return { expiredItems, nonExpiredItems };
}

function Storage() {
  const [items, setItems] = useState([]);
  const [isExpiredCollapsed, setIsExpiredCollapsed] = useState(false);
  const [isNonExpiredCollapsed, setIsNonExpiredCollapsed] = useState(false);

  useEffect(() => {
    getItems(setItems);
  }, []);

  const handleDelete = async (itemId) => {
    await handleDeleteItem(itemId, () => {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    });
  };

  const toggleExpiredCollapse = () => {
    setIsExpiredCollapsed(!isExpiredCollapsed);
  };
  const toggleNonExpiredCollapse = () => {
    setIsNonExpiredCollapsed(!isNonExpiredCollapsed);
  };

  const { expiredItems, nonExpiredItems } = processItems(items, handleDelete);

  return (
    <section className="flex flex-center">
      <header>
        <h3 className="hide">items</h3>
      </header>
      <article className=" flex flex-column items-content scrollable-article ">
        {expiredItems.length > 0 && (
          <section id="expired-items" className="storage-list">
            <h4
              className="flex flex-row"
              onClick={toggleExpiredCollapse}
              style={{ cursor: 'pointer' }}
            >
              Expired Items
              <span className="icon flex flex-center">
                {isExpiredCollapsed ? <FaChevronLeft /> : <FaChevronDown />}
              </span>
            </h4>
            {!isExpiredCollapsed && expiredItems}
          </section>
        )}

        {nonExpiredItems.length > 0 && (
          <section id="non-expired-items" className="storage-list">
            <h4
              className="flex flex-row"
              onClick={toggleNonExpiredCollapse}
              style={{ cursor: 'pointer' }}
            >
              Fresh Items
              <span className="icon flex flex-center">
                {isNonExpiredCollapsed ? <FaChevronLeft /> : <FaChevronDown />}
              </span>
            </h4>
            {!isNonExpiredCollapsed && nonExpiredItems}
          </section>
        )}

        {nonExpiredItems.length === 0 && expiredItems.length === 0 && (
          <p>No items in storage.</p>
        )}
        <Link to="/add-item" className="glass-block flex add-item-button">
          <FaPlus /> Add Item
        </Link>
      </article>
    </section>
  );
}

export default Storage;
