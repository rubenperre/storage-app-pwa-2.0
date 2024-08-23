import AddItem from '../components/add-item/AddItem';
import '../styles/add-items.scss';
import AddNewStorage from '../components/AddNewStorage';

function AddItemPage() {
  return (
    <section className="add-item-page">
      <header>
        <h2>ADD AN ITEM</h2>
      </header>
      <div className="scrollable-container">
        <AddItem />
        <AddNewStorage />
      </div>
    </section>
  );
}

export default AddItemPage;
