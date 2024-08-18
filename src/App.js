import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav';
import Storage from './pages/StoragePage';
import AddItem from './pages/AddItemPage';
import About from './pages/AboutPage';

import Modal from 'react-modal';
import DarkModeToggle from './components/DarkModeToggle';

Modal.setAppElement(document.body);

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <header className="App-header">
        <h1 className="hide">Storage App</h1>
      </header>
      <main>
        <DarkModeToggle />
        <Nav />
        <Routes>
          <Route index path="/" element={<Storage />} />
          <Route path="add-item" element={<AddItem />} />
          <Route path="about" element={<About />} />
        </Routes>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
}
