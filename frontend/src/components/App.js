import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./infoToolTip";
import Signup from "./Signup";
import { register, authorize, checkToken } from "../utils/auth";
import jwt_decode from "jwt-decode";
// .......End of imports.............................. ...........................................................................

function App() {
  const [cards, setCards] = useState([]);
  const [isCardOpen, setCardOpen] = useState(false);
  const [isAvatarOpen, setAvatarIsOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isImagePopupOpen, setImagePopup] = useState(false);
  const [currentUser, setCurentUser] = useState({});
  const [activeCard, setActiveCard] = useState({});
  const [isInfoToolTipOpen, setInfoToolTipOPen] = useState(false);
  const [infoToolTipIcon, setInfoToolTipIcon] = useState("");
  const [infoToolTipText, setInfoToolTipText] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  //.........end of states.......................................................................

  function jwtCheck() {
    checkToken(localStorage.getItem('jwt'))
      .then((res) => {
        if (localStorage.getItem('jwt')) {
          if (res.email) {
            setLoggedIn(true);
            setUser(res.email);
          } else {
            setLoggedIn(false);
          }
        }
      })
      .then(() => {})
      .catch((res) => {
        console.log("something went wrong with token", res);
      });
  }

  //................end of token check..........................

  function getApiData() {
    const jwt = localStorage.getItem('jwt')
    console.log("sdfsdfsdf",jwt)
    if (isLoggedIn) {
      const token = localStorage.getItem('jwt');
      const decoded = jwt_decode(token);
      api
        .getUserInfo(decoded._id)
        .then((profile) => {
          console.log(profile)
          setCurentUser(profile.data);
        })
        .catch((profile) =>
          console.log("there is error in profile api", profile),
        );
      api
        .getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((cards) => console.log("there is error in cards api", cards));
    } else {
      console.log("you need to login to get user data");
    }
  }

  useEffect(() => {
    jwtCheck();
    if (isLoggedIn){
      getApiData();
    }
  
  }, [isLoggedIn]);

  //.................end of userinfo call......................................................

  function signup(email, password) {
    register(email, password)
      .then((res) => {
        if (!res._id) {
          setInfoToolTipIcon("error");
          setInfoToolTipText("Ooops,something went wrong! please try again.");
          setInfoToolTipOPen(true);
        } else {
          setInfoToolTipIcon("succes");
          setInfoToolTipText("Succees! You have now been registred.");
          setInfoToolTipOPen(true);
          navigate("/login");
        }
      })
      .catch((res) => {
        setInfoToolTipIcon("error");
        setInfoToolTipText("Ooops,something went wrong! please try again.");
        setInfoToolTipOPen(true);
      });
  }
  function login(email, password) {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
        }
      })
      .catch((res) => {
        setInfoToolTipIcon("error");
        setInfoToolTipText("Ooops,something went wrong! please try again.");
        setInfoToolTipOPen(true);
      });
  }

  //.................end of authentication.........................................................

  function handleCloseButtonClick() {
    setCardOpen(false);
    setAvatarIsOpen(false);
    setProfileOpen(false);
    setImagePopup(false);
    setInfoToolTipOPen(false);
  }
  //................ end Of Close Button.................................................

  function handleUpdateUser(info) {
    api
      .setUserInfo(info)
      .then((res) => {
        setCurentUser(res);
        handleCloseButtonClick();
      })
      .catch((res) => console.log("there is a problem in update user", res));
  }
  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((res) => {
        setCurentUser(res);
        handleCloseButtonClick();
      })
      .catch((res) =>
        console.log("there is a problem in change avatar user", res),
      );
  }

  function handleCardLike(card) {
    console.log(card)
    const isLiked = card.likes.some((user) => user === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id, !isLiked)
        .then((res) => {
          const newCard = res.card;
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard,
            ),
          );
        })
        .catch((res) => console.log("there is a problem in like button", res));
    } else {
      api
        .deleteLike(card._id, isLiked)
        .then((res) => {
          const newCard = res.card;
          setCards((state) =>
            state.map((currentCard) =>
              currentCard._id === card._id ? newCard : currentCard,
            ),
          );
        })
        .catch((res) => console.log("there is a problem in like button", res));
    }
  }
  function handleCardDelete(id) {
    const cardId = id;
    api
      .deleteCard(id)
      .then(() => {
        setCards((state) => state.filter((card) => card._id !== cardId));
      })
      .catch((id) => console.log("there is error in deleting card", id));
  }
  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard).then((newCard) => {
      setCards([newCard, ...cards]);
      handleCloseButtonClick().catch((res) =>
        console.log("there is a problem in adding new cards", res),
      );
    });
  }
  //................................End of Api calls..........................................

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route
            path="login"
            element={<Header goTo="sign up" link="/signup" />}
          />
          <Route
            path="signup"
            element={<Header goTo="log in" link="/login" onclick={setLoggedIn}/>}
          />
          <Route
            path="/"
            element={<Header goTo="Log out" link="/login" email={user} />}
          />
        </Routes>
        <Routes>
          <Route
            path="/login"
            element={
              <Login
                title="Log in"
                link="Sign up"
                onAutharization={login}
                onLogin={isLoggedIn}
              />
            }
          />
          <Route
            path="/signup"
            element={<Signup onAutharization={signup} ok={infoToolTipIcon} />}
          />

          <Route element={<ProtectedRoute onLogin={isLoggedIn} />}>
            <Route
              path="/"
              element={
                <Main
                  setActiveCard={setActiveCard}
                  setAvatarIsOpen={setAvatarIsOpen}
                  setProfileOpen={setProfileOpen}
                  setCardOpen={setCardOpen}
                  setImagePopup={setImagePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
          </Route>
        </Routes>

        <Footer />
        <EditAvatarPopup
          isOpen={isAvatarOpen}
          onClose={handleCloseButtonClick}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isProfileOpen}
          onClose={handleCloseButtonClick}
          onUpdateUser={handleUpdateUser}
        />
        <EditPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isCardOpen}
          onClose={handleCloseButtonClick}
          onUpdateUser={handleAddPlaceSubmit}
        />
        <ImagePopup
          onOpen={isImagePopupOpen}
          onClose={handleCloseButtonClick}
          item={activeCard}
        />
        <InfoToolTip
          onClose={handleCloseButtonClick}
          isOpen={isInfoToolTipOpen}
          icon={infoToolTipIcon}
          text={infoToolTipText}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;