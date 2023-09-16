class MoviesApi {
    constructor(config) {
      this._url = config.baseUrl;
      this._headers = config.headers;
    }
  
    _checkResponse(res) {
  
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  
    }
  
    getMovies() {
  
      return fetch(`${this._url}/beatfilm-movies`, {
        method: 'GET',
        headers: this._headers
      })
        .then(this._checkResponse);
  
    }
  
  }
  
  const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co',
    headers: {
      "Content-Type": "application/json"
    }
  });
  
  export default moviesApi;