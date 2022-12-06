import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditPlacePopup(props) {
  const [title, setTitle] = useState({});
  const [link, setLink] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: title,
      link: link,
    });
  }
  useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name='card-editor'
      title='Edit card'
      button='Save'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        id='popup-input-type-title'
        className='popup__input popup__input_type_title'
        name='name'
        placeholder='Title'
        required
        minLength='2'
        maxLength='40'
      />

      <span
        className='popup__input-span'
        id='popup-input-type-title-error'
      ></span>

      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        type='url'
        id='popup-input-type-url'
        className='popup__input popup__input_type_link'
        name='link'
        placeholder='image link'
        required
      />

      <span
        className='popup__input-span'
        id='popup-input-type-url-error'
      ></span>
    </PopupWithForm>
  );
}
