import React from "react";
export default function ImagePopup(props) {
  return (
    <div
      className={
        props.onOpen
          ? `popup popup__preview popup_oppened`
          : `popup popup__preview`
      }
    >
      <div className="popup__preview-box">
        <button
          type="button"
          className="popup__close-button"
          aria-label="close-button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.item.link}
          alt={props.item.name}
          className="popup__preview"
        />
        <p className="popup__preview-text">{props.item.name}</p>
      </div>
    </div>
  );
}
