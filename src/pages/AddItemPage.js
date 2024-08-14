import AddItem from '../components/add-item/AddItem';
import '../styles/add-items.scss';

function AddItemPage() {
  return (
    <section className="add-item-page">
      <header>
        <h2>Add an Item</h2>
      </header>
      <AddItem />
    </section>
  );
}

export default AddItemPage;
