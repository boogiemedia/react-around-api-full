import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAutharization(password, email);
  };
  return (
    <form className='auth-form' method='post' onSubmit={handleSubmit}>
      <h3 className='auth-form__title'>Sign up</h3>
      <input
        type='email'
        className='auth-form__input auth-form__input_type_email'
        id='auth-form-input-type-description'
        placeholder='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        minLength='2'
        maxLength='40'
      />
      <input
        type='password'
        className='auth-form__input auth-form__input_type_password'
        id='auth-form-input-type-description'
        placeholder='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength='8'
        maxLength='40'
      />
      <button className='auth-form__button' type='submit'>
        Sign up
      </button>
      <div className='auth-form__footer'>
        <p className='auth-form__footer-title'>Already a member?</p>
        <Link
          to='/login'
          className='auth-form__footer-title auth-form__footer-title_link'
        >
          {' '}
          Log in here!
        </Link>
      </div>
    </form>
  );
}
