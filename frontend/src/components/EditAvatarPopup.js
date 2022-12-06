import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    
  }

  useEffect(() => {
    avatarRef.current.value = ""
  }, [props.isOpen])
  
  return (
    <PopupWithForm
      name="change-avatar"
      title="Change profile picture"
      button="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      onChange={(e) => avatarRef(e.target.value)}
    >
      <input
        ref={avatarRef}
        type="url"
        id="poppup-input-type-url"
        className="popup__input popup__input_type_link"
        name="avatar"
        placeholder="image link"
        required
      />
      <span
        className="popup__input-span"
        id="popup-input-type-url-error-picture-changer"
      ></span>
    </PopupWithForm>
  );
}
