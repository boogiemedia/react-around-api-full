import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function handleEditAvatarClick() {
    props.setAvatarIsOpen(true);
  }
  function handleEditProfileClick() {
    props.setProfileOpen(true);
  }
  function handleAddPlaceClick() {
    props.setCardOpen(true);
  }

  return (
    <main className='main'>
      <section className='profile'>
        <div className='profile__avatar-cover'>
          <div
            id='change-profile-picture'
            onClick={handleEditAvatarClick}
            className='profile__avatar-middle'
          ></div>
          <img
            src={currentUser.avatar}
            id='profile-avatar'
            alt='profile-avatar'
            className='profile__avatar'
          />
          <div className='profile__avatar-button'></div>
        </div>

        <div className='profile__info-block'>
          <h1 className='profile__info'>{currentUser.name}</h1>
          <button
            id='profile-edditor'
            onClick={handleEditProfileClick}
            type='button'
            className='profile__edit-button'
            aria-label='edit-button'
          ></button>
          <p className='profile__sub-info'>{currentUser.about}</p>
        </div>

        <button
          id='card-editor'
          onClick={handleAddPlaceClick}
          type='button'
          className='profile__add-button'
          aria-label='add-button'
        ></button>
      </section>
      <section className='elements'>
        {props.cards.map((data) => {
          return (
            <Card
              key={data._id}
              item={data}
              click={props.setImagePopup}
              setActiveCard={props.setActiveCard}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}
