class MainApi {
    constructor(config) {
        console.log(config)
        this._url = config.url;
        this._headers = config.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return Promise.resolve(res.json());
        } else {
            return Promise.reject(res.status);
        }
    }

    registerUser({ name, email, password }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ name, email, password }),
        }).then(this._checkResponse);
    }

    loginUser({ email, password }) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify({ email, password }),
        }).then(this._checkResponse);
    }

    getUser() {
        console.log(localStorage.getItem('jwt'))
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(this._checkResponse);
    }

    updateUser(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    getMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(this._checkResponse);
    }

    setUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    addMovie(data) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    deleteMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: 'DELETE',
            headers: {
                ...this._headers,
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        }).then(this._checkResponse);
    }

    getToken(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse)
            .then((data) => data);
    }

    updateToken() {
        this._headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    }
}

const mainApi = new MainApi({
    url: "https://api.yourmovies.nomoreparties.co",
    //url: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});
export default mainApi;