import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { name, link, likes, owner, _id } = props.item;

  const isOwn = owner._id === currentUser._id;
  const isLiked = likes.some(user => user._id === currentUser._id);
  const cardDeleteButtonClassName = ` ${
    isOwn ? "elements__trash" : "elements__trash elements__trash_hidden"
  }`;
  const cardLikeButtonClassName =`${
    isLiked ? "elements__like elements__like_type_active" : "elements__like"
  }`

  function handleCardClick() {
    props.click(true);
    props.setActiveCard(props.item);
  }
  function handleLikeClick(){
    props.onCardLike(props.item)
  }
  function handleDeleteClick(){
    props.onCardDelete(_id)
  }
  return (
    <div className="elements__block">
      <button className={cardDeleteButtonClassName} onClick= {handleDeleteClick}></button>
      <div
        className="elements__cover"
        style={{ backgroundImage: `url(${link})` }}
        onClick={handleCardClick}
      ></div>
      <h2 className="elements__title">{name}</h2>
      <div className="elements__like-box">
        <button type="button" className={cardLikeButtonClassName} onClick= {handleLikeClick}></button>
        <p className="elements__like-counter">{likes.length}</p>
      </div>
    </div>
  );
}
