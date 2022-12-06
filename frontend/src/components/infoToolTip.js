import React from 'react';

export default function InfoToolTip(props) {
  return (
    <div className={props.isOpen ? `popup  popup_oppened` : `popup`}>
      <div className='popup__info-tool-tip'>
        <button
          onClick={props.onClose}
          type='button'
          className='popup__close-button'
          aria-label='close-button'
        ></button>
        <div
          className={`popup__info-tool-tip__icon popup__info-tool-tip_type_${props.icon}`}
        ></div>
        <p className='popup__info-tool-tip__text'>{props.text}</p>
      </div>
    </div>
  );
}
