import React from 'react';

function About() {
  return (
    <section className="about-container scrollable-container">
      <h3>About Storage App</h3>
      <p>
        Welcome to the Storage App, a platform designed to help you manage and
        organize your items based on different storage types. Whether you're
        tracking items in your pantry, fridge, or freezer, this app makes it
        easy to keep everything in order.
      </p>
      <h3>Features</h3>
      <ul>
        <li>View and manage items by storage type.</li>
        <li>Add new storage types and items seamlessly.</li>
        <li>
          Visualize the expiration status of your items with a progress bar.
        </li>
        <li>Upload files and associate them with specific items.</li>
      </ul>
      <h3>How to Use</h3>
      <p>
        Start by navigating to the "Add an item" section, where you can choose
        from existing storage types or add new ones. Once you've selected a
        storage type, you can add items, providing details such as name, type,
        buy date, and expire date. The app will automatically categorize and
        display your items based on their storage type.
      </p>
      <h3>Contributors</h3>
      <p>
        This Storage App was created by
        <a href="https://github.com/rubenperre"> Ruben Perrewé</a>.
      </p>
      <h3>Contact</h3>
      <p>
        If you have any questions, feedback, or suggestions, please reach out to
        us at ruben.perre@hotmail.com
      </p>
    </section>
  );
}

export default About;
