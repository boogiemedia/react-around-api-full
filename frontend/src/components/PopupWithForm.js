import React from "react";
export default function PopupWithForm(props) {
  return (
    <div
      className={
        props.isOpen
          ? `popup popup_type_${props.name} popup_oppened`
          : `popup popup_type_${props.name}`
      }
    >
      <form method="post" name={props.name} className="popup__form" onSubmit= {props.onSubmit}>
        <button
          onClick={props.onClose}
          type="button"
          className="popup__close-button"
          aria-label="close-button"
        ></button>
        <h3 className="popup__title">{props.title}</h3>
        <div>{props.children}</div>
        <button className="popup__save-button" type="submit">
          {props.button}
        </button>
      </form>
    </div>
  );
}
