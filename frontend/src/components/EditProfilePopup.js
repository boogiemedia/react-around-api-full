import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState({});
  const [description, setDescription] = useState({});
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile-edditor"
      title="Edit profile"
      button="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="popup-input-type-name"
        className="popup__input popup__input_type_name"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
      />
      <span
        className="popup__input-span"
        id="popup-input-type-name-error"
      ></span>
      <input
        id="popup-input-type-description"
        className=" popup__input popup__input_type_description"
        name="about"
        required
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span
        className="popup__input-span"
        id="popup-input-type-description-error"
      ></span>
    </PopupWithForm>
  );
}
