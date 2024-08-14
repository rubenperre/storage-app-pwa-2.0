import { Link } from 'react-router-dom';
import '../styles/nav.scss';
import { useEffect, useRef, useState } from 'react';
import pantry from '../assets/images/closet512.png';

function Nav() {
  const [openDrawer, toggleDrawer] = useState(false);
  const drawerRef = useRef(null);

  useEffect(() => {
    /* Close the drawer when the user clicks outside of it */
    const closeDrawer = (event) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target) &&
        event.target !== document.querySelector('.hamburger-button')
      ) {
        toggleDrawer(false);
      }
    };

    document.addEventListener('mousedown', closeDrawer);
    return () => document.removeEventListener('mousedown', closeDrawer);
  }, []);

  return (
    <nav className="nav wrapper">
      <div className="navbar">
        <header className="App-header">
          <h2 className="hide">Main Navigation</h2>
        </header>
        <button
          className="hamburger-button"
          onClick={() => toggleDrawer((prev) => !prev)}
        >
          <div className="lines"></div>
        </button>

        <ul
          className="item menu flex"
          ref={drawerRef}
          data-open-drawer={openDrawer}
          style={{ transform: `translateX(${openDrawer ? '0' : '100%'})` }}
        >
          <div className="flex links-container">
            <li className="item">
              <Link to="/">My Storage</Link>
            </li>
            <li className="item">
              <Link to="add-item">Add an item</Link>
            </li>
            <li className="item">
              <Link to="about">about</Link>
            </li>
          </div>

          <img className="logo" src={pantry} alt="pantry logo" />
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
