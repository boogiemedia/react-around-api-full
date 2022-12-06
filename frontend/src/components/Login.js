import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = () => {
    if (props.onLogin) {
      history('/');
    }
  };
  useEffect(() => {
    redirect();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onAutharization(password, email);
  };

  return (
    <form className='auth-form' method='post' onSubmit={handleSubmit}>
      <h3 className='auth-form__title'>Log in</h3>
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
        Log in
      </button>
      <div className='auth-form__footer'>
        <p className='auth-form__footer-title'>Still not a member?</p>
        <Link
          to='/signup'
          className='auth-form__footer-title auth-form__footer-title_link'
        >
          {' '}
          Sign up here!
        </Link>
      </div>
    </form>
  );
}
