import PropTypes from 'prop-types';
import { FaRegTrashAlt } from 'react-icons/fa';

Item.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    storage: PropTypes.string.isRequired,
    buyDate: PropTypes.string.isRequired,
    expireDate: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  expireProgress: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  daysToExpire: PropTypes.number.isRequired,
};

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function Item(props) {
  const formattedBuyDate = formatDate(props.item.buyDate);
  const formattedExpireDate = formatDate(props.item.expireDate);

  console.log('Item component:', props.item); // Add this line

  return (
    <article className="flex flex-column item glass-block">
      <div className="flex flex-row flex-space-around">
        <p>{props.item.name}</p>
        <p>{props.item.type}</p>
        <p>{props.item.storage}</p>
      </div>
      {props.daysToExpire < 0 ? (
        <p>Dagen overtijd: {-props.daysToExpire}</p>
      ) : (
        <p>Dagen Resterend: {props.daysToExpire}</p>
      )}
      <article className="flex progress-container">
        <p>{formattedBuyDate}</p>
        <div className="progress-bar">
          <div
            className={`progress-bar-fill-${props.expireProgress}`}
            style={{
              width: `${props.percentage}%`,
            }}
          />
        </div>
        <p>{formattedExpireDate}</p>
      </article>
      <button onClick={props.onClick}>
        <FaRegTrashAlt />
      </button>
    </article>
  );
}

export default Item;
