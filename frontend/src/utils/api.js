class Api {
    constructor(options) {
        this._url = "http://localhost:3005";

        this._token = "3b0591f5-8d80-48af-bfb2-1499d5045304";
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Error: ${res.status}`);
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: {authorization: this._token},
        }).then(this._getResponseData);
    }

    addLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId} `, {
            method: "PUT",

            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
        }).then(this._getResponseData);
    }

    deleteLike(cardId) {
        return fetch(`${this._url}/cards/likes/${cardId} `, {
            method: "DELETE",

            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
        }).then(this._getResponseData);
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId} `, {
            method: "DELETE",
            headers: {authorization: this._token},
        }).then(this._getResponseData);
    }

    addNewCard(data) {
        return fetch(`${this._url}/cards`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(this._getResponseData);
    }

    // .......................End of cards api`s...................

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: {authorization: this._token},
        }).then(this._getResponseData);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name: data.name, about: data.about}),
        }).then(this._getResponseData);
    }

    changeAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar `, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(avatar),
        }).then(this._getResponseData);
    }

    // ..................End of USER INFO Api...................................................................................................
}

const api = new Api({});

export default api;
