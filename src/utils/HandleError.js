function handleError(statusCode, pathname) {

  if (pathname === '/signup') {
    switch (statusCode) {
      case 409:
        return 'Пользователь с таким email уже существует.';
      case 400:
        return 'При регистрации пользователя произошла ошибка.';
      default: return handleError;
    }
  } else if (pathname === '/signin') {
    switch (statusCode) {
      case 400:
        return 'Вы ввели неправильный логин или пароль';
      case 401:
        return 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
      case 403:
        return 'При авторизации произошла ошибка. Переданный токен некорректен';
      default: return handleError;
    }

  } else if (pathname === '/profile') {
    switch (statusCode) {
      case 409:
        return 'Пользователь с таким email уже существует.';
      case 400:
        return 'При обновлении профиля произошла ошибка.';
      default: return handleError;
    }

  } else {
    switch (statusCode) {
      case 500:
        return '500 На сервере произошла ошибка.';
      case 404:
        return '404 Страница по указанному маршруту не найдена.';
      default: return handleError;
    }
  }

}

export default handleError;