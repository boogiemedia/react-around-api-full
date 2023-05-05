import { React, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header(props) {
  const navigate = useNavigate;
  const [mobileMenu, setMobileMenu] = useState(false);
  const [size, setsize] = useState([window.innerWidth]);
  function logOut() {
    if (props.goTo === 'Log out') {
      localStorage.removeItem('jwt');
      props.onClick(false)
      navigate('/login');
    }
  }

  useEffect(() => {
    function sizeMetter() {
      if (size > 540) {
        setMobileMenu(false);
      } else {
        setMobileMenu(true);
      }
    }

    window.addEventListener('resize', sizeMetter);
    return () => window.removeEventListener('resize', sizeMetter);
  }, []);

  return (
    <header className='header'>
      <div className='header__side-bar'>
        <div className='header__logo'></div>
        <div
          className={`header__menu header__menu__${
            mobileMenu ? 'close' : 'hamburger'
          }`}
          onClick={() => {
            setMobileMenu((current) => !current);
          }}
        />
      </div>
      <div className={`header__side-bar${!mobileMenu ? '' : '_type_mobile'}`}>
        <p className='header__side-bar__email'>{props.email}</p>
        <Link
          to={props.link}
          className='header__side-bar__link'
          onClick={logOut}
        >
          {props.goTo}
        </Link>
      </div>
    </header>
  );
}
